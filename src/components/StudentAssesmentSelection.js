import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import { collection, doc, getDoc, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './StudentAssesmentSelection.css';
import StudentAssessmentHeader from './StudentAssesmentHeader';

const StudentAssessmentSelection = () => {
  const [grade, setGrade] = useState(''); // Auto-filled grade
  const [subject, setSubject] = useState('');
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [syllabus, setSyllabus] = useState('');
  const [assessmentAvailable, setAssessmentAvailable] = useState('');
  const [noMentorsMessage, setNoMentorsMessage] = useState('');

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

  // Fetch logged-in student's grade
  useEffect(() => {
    const fetchStudentGrade = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const studentDocRef = doc(firestore, 'students', user.uid);
          const studentDoc = await getDoc(studentDocRef);

          if (studentDoc.exists()) {
            const studentData = studentDoc.data();
            setGrade(studentData.grade);  // Auto-fill grade
          } else {
            alert('Student data not found.');
          }
        } else {
          alert('No user is logged in.');
        }
      } catch (error) {
        console.error('Error fetching student grade: ', error);
      }
    };

    fetchStudentGrade();
  }, []);

  // Dynamically show subjects based on grade
  const getSubjectsByGrade = () => {
    if (parseInt(grade) >= 6 && parseInt(grade) <= 10) {
      return ['Maths', 'Tamil', 'English', 'Science', 'Social'];
    } else if (parseInt(grade) >= 11 && parseInt(grade) <= 12) {
      return ['Maths', 'Tamil', 'English', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
    }
    return [];
  };

  // Fetch mentors based on subject and grade
  useEffect(() => {
    const fetchMentors = async () => {
      if (subject && grade) {
        const subjectLowerCase = subject.toLowerCase();
        const selectedGrade = parseInt(grade);

        const q = query(
          collection(firestore, 'users'),
          where('userType', '==', 'mentor'),
          where('subject', '==', subjectLowerCase)
        );

        const querySnapshot = await getDocs(q);

        const mentorsList = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((mentor) => {
            const fromGrade = parseInt(mentor.fromGrade);
            const toGrade = parseInt(mentor.toGrade);
            return selectedGrade >= fromGrade && selectedGrade <= toGrade;
          });

        if (mentorsList.length > 0) {
          setMentors(mentorsList);
          setNoMentorsMessage('');
        } else {
          setMentors([]);
          setNoMentorsMessage('No mentors available for the selected criteria.');
        }
      } else {
        setMentors([]);
        setNoMentorsMessage('');
      }
    };

    fetchMentors();
  }, [subject, grade]);

  // Auto-fill syllabus based on mentor selection
  useEffect(() => {
    if (selectedMentor) {
      const selectedMentorData = mentors.find((mentor) => mentor.id === selectedMentor);
      if (selectedMentorData) {
        setSyllabus(selectedMentorData.board); // Auto-fill syllabus
      }
    }
  }, [selectedMentor, mentors]);

  // Check if assessment is available
  const checkAssessmentAvailability = async () => {
    if (grade && subject && syllabus && selectedMentor) {
      const syllabusCollection = syllabus === 'cbse' ? 'cbse' : 'samacheer';

      const assessmentRef = collection(
        firestore,
        'mentors',
        selectedMentor,
        'assessment',
        syllabusCollection,
        'grade',
        grade,
        'subject',
        subject,
        'questions'
      );

      const questionsSnapshot = await getDocs(assessmentRef);

      if (!questionsSnapshot.empty) {
        setAssessmentAvailable('Assessment is ready.');
        setTimeout(() => {
          navigate('/student-assessment-page', {
            state: { mentorId: selectedMentor, syllabus, grade, subject }
          });
        }, 1000); // delay in milliseconds
      } else {
        setAssessmentAvailable('No questions posted for the selected criteria.');
      }
    } else {
      setAssessmentAvailable('');
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
      <div>
        <StudentAssessmentHeader />
        <div className="student-assessment-container">
          <h3 style={{ fontWeight: 'bold', textAlign: 'center' }}>
            Welcome, {username}
          </h3>
          <h2>Choose Assessment Details</h2>

          <div>
            <label>Grade</label>
            <input type="text" value={grade} readOnly /> {/* Auto-filled grade */}
          </div>

          <div>
            <label>Subject</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option value="">Select Subject</option>
              {getSubjectsByGrade().map((subj, index) => (
                <option key={index} value={subj.toLowerCase()}>{subj}</option>
              ))}
            </select>
          </div>

          {mentors.length > 0 && (
            <div>
              <label>Mentor</label>
              <select value={selectedMentor} onChange={(e) => setSelectedMentor(e.target.value)}>
                <option value="">Select Mentor</option>
                {mentors.map((mentor) => (
                  <option key={mentor.id} value={mentor.id}>
                    {mentor.username} - {mentor.subject}
                  </option>
                ))}
              </select>
            </div>
          )}

          {noMentorsMessage && <div className="student-assessment-message">{noMentorsMessage}</div>}

          <div>
            <label>Syllabus</label>
            <input type="text" value={syllabus} readOnly /> {/* Auto-filled syllabus */}
          </div>

          <button onClick={checkAssessmentAvailability}>Check Assessment Availability</button>

          {assessmentAvailable && <div className="student-assessment-message">{assessmentAvailable}</div>}
        </div>
      </div>
    </section>
  );
};

export default StudentAssessmentSelection;
