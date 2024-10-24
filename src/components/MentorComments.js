import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import { collection, doc, getDoc, getDocs, updateDoc, query, where } from 'firebase/firestore';
import CommentsHeader from './CommentsHeader';
import './Comments.css';
import emailjs from 'emailjs-com'; // Make sure to import EmailJS

const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url('${process.env.PUBLIC_URL}/pc-image.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '20px',
    overflow: 'hidden',
};

const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    maxWidth: '1200px',
    padding: '20px',
    gap: '20px'
};

const unrepliedCommentsContainerStyle = {
    flex: '1',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxHeight: '70vh',
    overflowY: 'auto'
};

const repliedCommentsContainerStyle = {
    flex: '2',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxHeight: '70vh',
    overflowY: 'auto'
};

const MentorComments = () => {
    const [comments, setComments] = useState([]);
    const [reply, setReply] = useState('');
    const [selectedCommentId, setSelectedCommentId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [mentorUsername, setMentorUsername] = useState(''); // State to store mentor's username
    const [studentEmail, setStudentEmail] = useState(''); // State to store student's email
    const user = auth.currentUser;

    // Fetch mentor's username using the current user's uid
    const fetchMentorUsername = async () => {
        try {
            const userRef = doc(firestore, `users/${user.uid}`);
            const userSnapshot = await getDoc(userRef);
            const username = userSnapshot.data()?.username || 'Mentor';
            setMentorUsername(username);
        } catch (error) {
            console.error('Error fetching mentor username:', error);
        }
    };

    const fetchStudentNameAndEmail = async () => {
        try {
            const userRef = doc(firestore, `users/${user.uid}`);
            const userSnapshot = await getDoc(userRef);
            const userData = userSnapshot.data();
            setStudentName(userData?.username || 'Student');
            setStudentEmail(userData?.email || ''); // Set student email
        } catch (error) {
            console.error('Error fetching student name and email:', error);
        }
    };

    const fetchComments = async () => {
        try {
            await fetchStudentNameAndEmail();
            const commentsRef = collection(firestore, `mentors/${user.uid}/comments`);
            const commentsSnapshot = await getDocs(commentsRef);
            const commentsList = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setComments(commentsList);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    // Function to send email using EmailJS
    const sendEmail = (to_email, from_name, comment, reply) => {
        const templateParams = {
            to_email: to_email,
            from_name: from_name,
            comment: comment,
            reply: reply,
        };

        emailjs.send('service_vp1sl4d', 'template_bs4kz37', templateParams, 'pKbyNtM9Fqa8pn_Ey')
            .then(response => {
                console.log('Email sent successfully:', response);
            })
            .catch(error => {
                console.error('Error sending email:', error);
            });
    };

    useEffect(() => {
        if (user) {
            fetchMentorUsername(); // Fetch mentor's username when component loads
            fetchComments();
        }
    }, [user]);

    const handleReply = async () => {
        if (!reply || !selectedCommentId) return alert('Please select a comment and enter a reply.');

        try {
            const mentorCommentRef = doc(firestore, `mentors/${user.uid}/comments/${selectedCommentId}`);
            await updateDoc(mentorCommentRef, { reply: reply });

            const mentorCommentSnapshot = await getDoc(mentorCommentRef);
            const commentData = mentorCommentSnapshot.data();

            if (commentData && commentData.studentName) {
                const studentsRef = collection(firestore, 'users');
                const studentQuery = query(studentsRef, where('username', '==', commentData.studentName));
                const studentQuerySnapshot = await getDocs(studentQuery);

                if (!studentQuerySnapshot.empty) {
                    const studentDoc = studentQuerySnapshot.docs[0];
                    const studentUid = studentDoc.id;


                    // Fetch student email here
                    const studentData = studentDoc.data();
                    const retrievedEmail = studentData?.email; // Get student email

                    const studentCommentRef = collection(firestore, `students/${studentUid}/comments`);
                    const studentCommentQuery = query(studentCommentRef, where('mentorName', '==', commentData.mentorName), where('comment', '==', commentData.comment));
                    const studentCommentSnapshot = await getDocs(studentCommentQuery);

                    if (!studentCommentSnapshot.empty) {
                        const studentCommentDoc = studentCommentSnapshot.docs[0];
                        const studentCommentToUpdate = doc(firestore, `students/${studentUid}/comments/${studentCommentDoc.id}`);

                        await updateDoc(studentCommentToUpdate, { reply: reply });
                        console.log('Reply updated in student collection.');

                        // Add this line to log the retrieved student email
                        console.log('Sending email to:', studentEmail);
                        console.log('From:', mentorUsername);

                        // Send email notification
                        if (retrievedEmail) {
                            sendEmail(retrievedEmail, mentorUsername, commentData.comment, reply); // Use retrieved email here
                        } else {
                            console.error('Student email not found.');
                        }
                    } else {
                        console.error('Student comment not found.');
                    }
                } else {
                    console.error('Student not found.');
                }
            } else {
                console.error('Student name not found in comment.');
            }

            setReply('');
            setSelectedCommentId('');
            alert('Reply added and email notification sent successfully!');
            fetchComments();
        } catch (error) {
            console.error('Error adding reply:', error);
        }
    };


    const unrepliedComments = comments.filter(comment => !comment.reply);
    const repliedComments = comments.filter(comment => comment.reply);

    return (
        <div style={sectionStyle}>
            <div className="comments-section">
                <CommentsHeader />
                <h3 style={{ fontWeight: 'bold' }}>
                    Welcome, {mentorUsername}
                </h3>
                <h2>Mentor Comments Page</h2>
                <div style={containerStyle}>
                    {/* Container for unreplied comments */}
                    <div style={unrepliedCommentsContainerStyle}>
                        <h3>Unreplied Comments</h3>
                        {unrepliedComments.length > 0 ? (
                            unrepliedComments.map(comment => (
                                <div key={comment.id} className="comment-card">
                                    <p>Student Name: {comment.studentName}</p>
                                    <p>Subject: {comment.subject}</p>
                                    <p>Comment: {comment.comment}</p>
                                    <textarea
                                        className="comment-input"
                                        value={reply}
                                        onChange={e => setReply(e.target.value)}
                                        placeholder="Enter your reply"
                                    />
                                    <button className="comment-button" onClick={() => setSelectedCommentId(comment.id)}>Select Comment</button>
                                    <button className="comment-button" onClick={handleReply}>Post Reply</button>
                                </div>
                            ))
                        ) : (
                            <h3>No unreplied comments.</h3>
                        )}
                    </div>

                    {/* Container for replied comments */}
                    <div style={repliedCommentsContainerStyle}>
                        <h3>Replied Comments (History)</h3>
                        {repliedComments.length > 0 ? (
                            repliedComments.map(comment => (
                                <div key={comment.id} className="comment-card">
                                    <p>Student Name: {comment.studentName}</p>
                                    <p>Mentor Name: {comment.mentorName}</p>
                                    <p>Subject: {comment.subject}</p>
                                    <p>Comment: {comment.comment}</p>
                                    <p>Reply: {comment.reply}</p>
                                </div>
                            ))
                        ) : (
                            <h3>No replied comments.</h3>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentorComments;
