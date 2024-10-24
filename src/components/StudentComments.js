import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore'; // Import the Timestamp
import StudentCommentsHeader from './StudentsCommentsHeader';
import './Comments.css';
import emailjs from 'emailjs-com'; // Import EmailJS

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

const postCommentsContainerStyle = {
    flex: '1',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
};

const commentsHistoryContainerStyle = {
    flex: '2',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxHeight: '70vh',
    overflowY: 'auto'
};

const StudentComments = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [selectedMentor, setSelectedMentor] = useState('');
    const [mentors, setMentors] = useState([]);
    const [studentName, setStudentName] = useState('');
    const [studentGrade, setStudentGrade] = useState(''); 
    const [mentorEmail, setMentorEmail] = useState('');
    const user = auth.currentUser;
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDocRef = doc(firestore, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUsername(userData.username);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUsername();
    }, []);

    const fetchMentors = async () => {
        try {
            const userSnapshot = await getDocs(collection(firestore, 'users'));
            const mentorList = userSnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(user => user.userType === 'mentor');
            setMentors(mentorList);
        } catch (error) {
            console.error('Error fetching mentors:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const userRef = doc(firestore, `users/${user.uid}`);
            const userSnapshot = await getDoc(userRef);
            setStudentName(userSnapshot.data()?.username || 'Student');
            setStudentGrade(userSnapshot.data()?.grade || '');

            const commentsRef = collection(firestore, `students/${user.uid}/comments`);
            const commentsSnapshot = await getDocs(commentsRef);
            const commentsList = commentsSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    timestamp: data.timestamp ? new Date(data.timestamp.seconds * 1000).toLocaleString() : '',
                };
            });
            setComments(commentsList);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchMentors();
        fetchComments();
    }, [user]);

    const handleAddComment = async () => {
        if (!selectedMentor || !newComment) {
            return alert('Please fill all fields.');
        }

        const mentorData = mentors.find(mentor => mentor.id === selectedMentor);
        if (!mentorData) return alert('Mentor not found.');

        // Set the mentor's email to the state
        setMentorEmail(mentorData.email);

        const newCommentData = {
            mentorName: mentorData.username,
            subject: mentorData.subject,
            studentName: studentName,
            comment: newComment,
            reply: '',
            timestamp: Timestamp.now(),
        };

        try {
            const newCommentRef = doc(collection(firestore, `students/${user.uid}/comments`));
            await setDoc(newCommentRef, newCommentData);

            const mentorCommentRef = doc(collection(firestore, `mentors/${selectedMentor}/comments`));
            await setDoc(mentorCommentRef, newCommentData);

            setNewComment('');
            alert('Comment added successfully!');
            sendEmail(mentorData.email); // Send the email here
            fetchComments();
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    // Function to send email using EmailJS
    const sendEmail = async (mentorEmail) => { // Updated to accept the mentor email as a parameter
        const emailData = {
            from_name: studentName,
            to_email: mentorEmail,
            comment: newComment,
        };

        try {
            await emailjs.send('service_nac2lvk', 'template_iy636se', emailData, 'pKbyNtM9Fqa8pn_Ey');
            console.log('Email sent successfully!');
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    };

    const getFilteredMentors = () => {
        return mentors.filter(mentor => {
            const mentorFromGrade = parseInt(mentor.fromGrade, 10);
            const mentorToGrade = parseInt(mentor.toGrade, 10);
            const grade = parseInt(studentGrade, 10);
            return grade >= mentorFromGrade && grade <= mentorToGrade;
        });
    };

    return (
        <div style={sectionStyle}>
            <div className="comments-section">
                <StudentCommentsHeader />
                <h3 style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Welcome, {username}
                </h3>
                <h2>Student Comments Page</h2>
                <div style={containerStyle}>
                    <div style={postCommentsContainerStyle}>
                        <h3>Post a New Comment</h3>
                        <div style={{ marginBottom: '20px' }}>
                            <h4>Grade: {studentGrade}</h4>
                        </div>
                        <select className="comment-select" onChange={e => setSelectedMentor(e.target.value)} value={selectedMentor}>
                            <option value="">Select Mentor</option>
                            {getFilteredMentors().map(mentor => (
                                <option key={mentor.id} value={mentor.id}>
                                    {mentor.username} ({mentor.subject})
                                </option>
                            ))}
                        </select>
                        <textarea
                            className="comment-input"
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            placeholder="Enter your comment"
                        />
                        <button className="comment-button" onClick={handleAddComment}>Post Comment</button>
                    </div>

                    <div style={commentsHistoryContainerStyle}>
                        <h3>Comments History</h3>
                        {comments.length > 0 ? (
                            comments.map(comment => (
                                <div key={comment.id} className="comment-card">
                                    <p>Student Name: {comment.studentName || 'Unknown'}</p>
                                    <p>Mentor Name: {comment.mentorName}</p>
                                    <p>Subject: {comment.subject}</p>
                                    <p>Comment: {comment.comment}</p>
                                    {comment.reply ? <p>Reply: {comment.reply}</p> : <p>No reply yet.</p>}
                                    <p>Timestamp: {comment.timestamp}</p>
                                </div>
                            ))
                        ) : (
                            <h3>No comments found.</h3>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentComments;
