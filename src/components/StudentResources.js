import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { Container } from 'react-bootstrap';
import './StudentResources.css';
import StudentResourcesHeader from './StudentResourcesHeader';

const StudentResources = () => {
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [mentorList, setMentorList] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [resourceList, setResourceList] = useState([]);
  const [mentorsAvailable, setMentorsAvailable] = useState(true);
  const [resourcesAvailable, setResourcesAvailable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [syllabus, setSyllabus] = useState('');

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


  // Fetch current logged-in student's grade
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const q = query(
            collection(firestore, 'users'),
            where('email', '==', currentUser.email),
            where('userType', '==', 'student')
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const studentData = querySnapshot.docs[0].data();
            setGrade(studentData.grade);
          }
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        setErrorMessage('Error fetching student data');
      }
    };
    fetchStudentData();
  }, []);

  // Fetch mentors based on the selected subject and grade
  const fetchMentorsForSubjectAndGrade = async (selectedSubject, selectedGrade) => {
    try {
      const lowerCaseSubject = selectedSubject.toLowerCase();
      const selectedGradeInt = parseInt(selectedGrade);

      const q = query(
        collection(firestore, 'users'),
        where('userType', '==', 'mentor'),
        where('subject', '==', lowerCaseSubject)
      );

      const querySnapshot = await getDocs(q);
      const mentors = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(mentor => {
          const fromGrade = parseInt(mentor.fromGrade);
          const toGrade = parseInt(mentor.toGrade);
          return selectedGradeInt >= fromGrade && selectedGradeInt <= toGrade;
        });

      if (mentors.length > 0) {
        setMentorList(mentors);
        setMentorsAvailable(true);
      } else {
        setMentorsAvailable(false);
      }
    } catch (error) {
      console.error('Error fetching mentors:', error);
      setErrorMessage('Error fetching mentors');
    }
  };

  // Fetch resources based on selected mentor and grade
  const fetchResourcesForMentorAndGrade = async (mentorID, selectedGrade) => {
    try {
      const q = query(
        collection(firestore, `mentors/${mentorID}/resources`),
        where('grade', '==', selectedGrade)
      );
      const querySnapshot = await getDocs(q);
      const resources = querySnapshot.docs.map(doc => ({
        title: doc.data().filename,
        link: doc.data().accesstoken
      }));
      if (resources.length > 0) {
        setResourceList(resources);
        setResourcesAvailable(true);
      } else {
        setResourcesAvailable(false);
      }
    } catch (error) {
      console.error('Error fetching resources:', error);
      setErrorMessage('Error fetching resources');
    }
  };

  // Handle subject change
  const handleSubjectChange = (e) => {
    const selectedSubject = e.target.value;
    setSubject(selectedSubject);
    setSelectedMentor('');
    setResourceList([]);

    if (selectedSubject && grade) {
      fetchMentorsForSubjectAndGrade(selectedSubject, grade);
    }
  };

  // Handle mentor change
  const handleMentorChange = (e) => {
    const selectedMentorID = e.target.value;
    const mentor = mentorList.find(mentor => mentor.id === selectedMentorID);
    setSelectedMentor(selectedMentorID);
    setSyllabus(mentor?.board || '');
    setResourceList([]);
    if (selectedMentorID && grade) {
      fetchResourcesForMentorAndGrade(selectedMentorID, grade);
    }
  };

  // Dynamically change subject options based on grade
  useEffect(() => {
    if (grade >= 6 && grade <= 10) {
      setSubjectOptions(['tamil', 'english', 'maths', 'science', 'social']);
    } else if (grade >= 11 && grade <= 12) {
      setSubjectOptions(['tamil', 'english', 'maths', 'cs', 'physics', 'chemistry', 'commerce', 'economics']);
    }
  }, [grade]);

  return (
    <div style={sectionStyle}>
      <StudentResourcesHeader />
      <Container className="student-resources-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Welcome Message */}
        <h3 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>
          Welcome, {username}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          {/* Left Section */}
          <div className="left-section" style={{ flex: '1', marginRight: '10px' }}>
            <h3 className="student-resources-heading">Select Resources</h3>

            {/* Grade Display */}
            <div className="dropdown-section">
              <label htmlFor="grade">Grade</label>
              <input type="text" value={grade} disabled />
            </div>

            {/* Subject Dropdown */}
            {grade && (
              <div className="dropdown-section">
                <label htmlFor="subject">Subject</label>
                <select id="subject" value={subject} onChange={handleSubjectChange}>
                  <option value="">Select Subject</option>
                  {subjectOptions.map((sub, index) => (
                    <option key={index} value={sub}>{sub.charAt(0).toUpperCase() + sub.slice(1)}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Mentor Dropdown */}
            {subject && mentorList.length > 0 && (
              <div className="dropdown-section">
                <label htmlFor="mentor">Mentor</label>
                <select id="mentor" value={selectedMentor} onChange={handleMentorChange}>
                  <option value="">Select Mentor</option>
                  {mentorList.map((mentor, index) => (
                    <option key={index} value={mentor.id}>{mentor.username} ({mentor.board})</option>
                  ))}
                </select>
              </div>
            )}

            {/* Syllabus Display */}
            {syllabus && (
              <p>Syllabus: {syllabus.charAt(0).toUpperCase() + syllabus.slice(1)}</p>
            )}

            {!mentorsAvailable && <p>No mentors available for the selected subject and grade.</p>}
          </div>

          {/* Right Section for displaying resources */}
          <div className="right-section" style={{ flex: '1', marginLeft: '10px' }}>
            <h4 className="student-resources-heading">Available Resources</h4>
            {resourcesAvailable ? (
              resourceList.length > 0 ? (
                <ul>
                  {resourceList.map((resource, index) => (
                    <li key={index}><a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.title}</a></li>
                  ))}
                </ul>
              ) : (
                <p>No resources available for the selected mentor.</p>
              )
            ) : (
              <p>No resources available for the selected grade.</p>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default StudentResources;

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