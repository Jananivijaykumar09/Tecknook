import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { firestore, auth } from '../firebase';
import { collection, getDocs, addDoc, doc, writeBatch,getDoc } from 'firebase/firestore';
import './StudentAssesmentPage.css';
import StudentAssessmentHeader from './StudentAssesmentHeader';

const StudentAssessmentPage = () => {
  const [questions, setQuestions] = useState([]);
  const [studentAnswers, setStudentAnswers] = useState({});
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [score, setScore] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const location = useLocation();

  // Get parameters passed from the Assessment Selection page
  const { mentorId, syllabus, grade: standard, subject } = location.state || {};
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

  // Fetch questions based on the selected criteria
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const syllabusCollection = syllabus === 'cbse' ? 'cbse' : 'samacheer';
        const questionsRef = collection(
          firestore,
          'mentors',
          mentorId,
          'assessment',
          syllabusCollection,
          'grade',
          standard,
          'subject',
          subject,
          'questions'
        );

        const questionsSnapshot = await getDocs(questionsRef);
        if (!questionsSnapshot.empty) {
          const questionsList = questionsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setQuestions(questionsList);
        } else {
          setQuestions([]);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [mentorId, syllabus, standard, subject]);

  // Handle answer change
  const handleAnswerChange = (questionId, selectedOption) => {
    setStudentAnswers({ ...studentAnswers, [questionId]: selectedOption });
  };

  // Submit answers and store them in Firebase
  const handleSubmitAnswers = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('No user is logged in.');
        return;
      }

      const studentAssessmentRef = collection(
        firestore,
        'students',
        user.uid,
        'assessments'
      );

      const newAssessmentRef = await addDoc(studentAssessmentRef, { date: new Date() });
      const assessmentId = newAssessmentRef.id;

      const answersCollectionRef = collection(
        firestore,
        'students',
        user.uid,
        'assessments',
        assessmentId,
        'subject',
        subject,
        'grade',
        standard,
        'questions'
      );

      const batch = writeBatch(firestore);

      let totalScore = 0;
      const incorrects = [];

      questions.forEach((question) => {
        const selectedAnswer = studentAnswers[question.id] || '';
        const correct = question.answer === selectedAnswer;
        const score = correct ? 1 : 0;

        if (score === 1) {
          totalScore += 1;
        } else {
          incorrects.push(question.id);
        }

        const questionRef = doc(answersCollectionRef);

        batch.set(questionRef, {
          question: question.question,
          answer: selectedAnswer,
          score,
          createdAt: new Date()
        });
      });

      await batch.commit();

      setScore(totalScore);
      setIncorrectAnswers(incorrects);
      setSubmissionMessage(`Assessment submitted successfully! Your score is: ${totalScore}/${questions.length}`);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      setSubmissionMessage('Failed to submit the assessment. Please try again.');
    }
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
    <section style={sectionStyle}>
      <StudentAssessmentHeader />
      <div className="student-assessment-page">
        <h3 style={{ fontWeight: 'bold', textAlign: 'center' }}>
          Welcome, {username}
        </h3>
        <h2>Answer the Questions</h2>
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <div
              key={question.id}
              className={`question-card ${incorrectAnswers.includes(question.id) ? 'incorrect' : ''}`}
            >
              <p>{index + 1}. {question.question}</p>
              <div className="options-container">
                {question.options.map((option, i) => (
                  <label key={i}>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={studentAnswers[question.id] === option}
                      onChange={() => handleAnswerChange(question.id, option)}
                      disabled={score !== null}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No questions available for this assessment.</p>
        )}
        <button onClick={handleSubmitAnswers} className="submit-button">Submit Answers</button>
        {submissionMessage && <p className="submission-message">{submissionMessage}</p>}
      </div>
    </section>
  );
};

export default StudentAssessmentPage;
