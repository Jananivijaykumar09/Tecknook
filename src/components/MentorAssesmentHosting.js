import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore, auth } from '../firebase';
import { doc, getDoc, collection, addDoc } from 'firebase/firestore';
import './MentorAssesmentHosting.css';
import MentorAssessmentHeader from './MentorAssesmentHeader';

const MentorAssessmentAndQuestionPage = () => {
    const [standard, setStandard] = useState('');
    const [subject, setSubject] = useState('');
    const [board, setBoard] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');  // Keeping answer as a string
    const [options, setOptions] = useState(['']);
    const [notification, setNotification] = useState('');
    const [fromGrade, setFromGrade] = useState('');
    const [toGrade, setToGrade] = useState('');
    const optionInputRef = useRef(null);
    const navigate = useNavigate();

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
                        setUsername(userData.username); // Set the username from Firestore
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUsername();
    }, []);

    useEffect(() => {
        const fetchMentorDetails = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDocRef = doc(firestore, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setSubject(data.subject || '');
                        setBoard(data.board || '');
                        setFromGrade(data.fromGrade || '');
                        setToGrade(data.toGrade || '');
                    } else {
                        setNotification('Error: User data not found.');
                    }
                } else {
                    setNotification('Error: No user is currently logged in.');
                }
            } catch (error) {
                console.error('Error fetching mentor details: ', error);
                setNotification('Error fetching mentor details.');
            }
        };

        fetchMentorDetails();
    }, []);

    const handleStandardChange = (e) => setStandard(e.target.value);
    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOptionField = () => {
        if (options.length < 4) {
            setOptions([...options, '']);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!standard) {
            alert('Please select a grade.');
            return;
        }

        // Check if the answer is in the options
        if (!options.includes(answer.trim())) {
            setNotification('Error: The answer is not in the options.');
            optionInputRef.current.focus(); // Focus on the options input for editing
            return;
        }

        if (question.trim() && answer.trim()) {
            try {
                const syllabusCollection = board === 'cbse' ? 'cbse' : 'samacheer';

                const questionsRef = collection(
                    firestore,
                    'mentors',
                    auth.currentUser.uid,
                    'assessment',
                    syllabusCollection,
                    'grade',
                    standard,
                    'subject',
                    subject,
                    'questions'
                );

                await addDoc(questionsRef, {
                    question: question,
                    answer: answer,
                    options: options.filter(opt => opt.trim()),
                    createdAt: new Date()
                });

                setNotification('Question, answer, and options posted successfully!');
                setQuestion('');
                setAnswer('');
                setOptions(['']);
            } catch (error) {
                console.error('Error adding question, answer, and options: ', error);
                setNotification('Error posting question, answer, and options.');
            }
        } else {
            alert('Please enter both question and answer.');
        }
    };

    const generateGradeOptions = () => {
        const grades = [];
        for (let i = parseInt(fromGrade); i <= parseInt(toGrade); i++) {
            grades.push(i.toString());
        }
        return grades;
    };

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

    return (
        <div>
            <MentorAssessmentHeader />
            <section style={sectionStyle}>
                <div className="page-container">
                    <h3 style={{ fontWeight: 'bold', textAlign: 'center' }}>
                        Welcome, {username}
                    </h3>
                    <div className="form-box">
                        <div className="header-container">
                            <h2 className="white-text">Select Assessment Details</h2>
                        </div>
                        <div className="dropdown-container">
                            <div>
                                <label className="white-text">Grade</label>
                                <select value={standard} onChange={handleStandardChange}>
                                    <option value="">Select Grade</option>
                                    {generateGradeOptions().map(grade => (
                                        <option key={grade} value={grade}>{grade}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label>Subject</label>
                                <input type="text"  className="retrieved-input" value={subject} readOnly />
                            </div>

                            <div>
                                <label>Syllabus</label>
                                <input type="text"  className="retrieved-input" value={board} readOnly />
                            </div>
                        </div>

                        <div className="question-form-container">
                            <h2 className="white-text">Post Questions and Answer for Assessment</h2>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label>
                                        Question
                                        <textarea
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                            placeholder="Enter your question here"
                                            required
                                        />
                                    </label>
                                </div>
                                <div className="options-container">
                                    <h3 className="white-text">Add Options (Max 4)</h3>
                                    {options.map((option, index) => (
                                        <div key={index}>
                                            <input
                                                type="text"
                                                value={option}
                                                placeholder={`Option ${index + 1}`}
                                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                                ref={index === 0 ? optionInputRef : null}
                                                required
                                            />
                                        </div>
                                    ))}
                                    {options.length < 4 && (
                                        <button type="button" className="add-option-button" onClick={addOptionField}>
                                            + Add Option
                                        </button>
                                    )}
                                </div>
                                <div>
                                    <label>
                                        Answer
                                        <input
                                            type="text" // Change to text input
                                            value={answer}
                                            onChange={(e) => setAnswer(e.target.value)}
                                            placeholder="Enter the answer here"
                                            required
                                            className="answer-input" // Add class for styling
                                        />
                                    </label>
                                </div>
                                <button className="submit-question-button" type="submit">Post Question and Answer</button>
                            </form>
                            {notification && <div className="notification">{notification}</div>}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MentorAssessmentAndQuestionPage;
