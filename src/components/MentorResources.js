import React, { useState, useEffect } from 'react';
import { firestore, auth, storage } from '../firebase';
import { collection, doc, getDoc, getDocs, addDoc, query, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { Container, Button } from 'react-bootstrap';
import './MentorResources.css';
import ResourcesHeader from './ResourcesHeader';

const MentorResources = () => {
  const [subject, setSubject] = useState('');
  const [fromGrade, setFromGrade] = useState(0);
  const [toGrade, setToGrade] = useState(0);
  const [grade, setGrade] = useState('');
  const [resourceFile, setResourceFile] = useState(null);
  const [uploadHistory, setUploadHistory] = useState([]);
  const [mentorExists, setMentorExists] = useState(false);
  const [username, setUsername] = useState('');

  const user = auth.currentUser;

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
    const checkMentor = async () => {
      if (!user || !user.uid) {
        console.error('User or user.uid is undefined');
        return;
      }

      const mentorRef = doc(firestore, 'mentors', user.uid);
      const mentorSnap = await getDoc(mentorRef);

      if (mentorSnap.exists()) {
        setMentorExists(true);
        fetchUploadHistory(); // Fetch upload history immediately if mentor exists
      } else {
        setMentorExists(false);
      }
    };

    const fetchUserDetails = async () => {
      if (!user || !user.uid) return;

      const userRef = doc(firestore, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setSubject(userData.subject);
        // Convert fromGrade and toGrade to integers
        setFromGrade(parseInt(userData.fromGrade, 10));
        setToGrade(parseInt(userData.toGrade, 10));
      } else {
        console.error('User document does not exist');
      }
    };

    checkMentor();
    fetchUserDetails();
  }, [user]);

  const handleFileChange = (e) => {
    setResourceFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!resourceFile || !grade) {
      alert('All fields are required');
      return;
    }

    try {
      const storageRef = ref(storage, `mentors/${resourceFile.name}`);

      await uploadBytes(storageRef, resourceFile);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(firestore, `mentors/${user.uid}/resources`), {
        grade,
        subject,
        filename: resourceFile.name,
        accesstoken: downloadURL,
        timestamp: new Date(),
      });

      alert('File uploaded successfully!');
      fetchUploadHistory(); // Refresh upload history
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file: ' + error.message);
    }
  };

  const fetchUploadHistory = async () => {
    const resourcesQuery = query(collection(firestore, `mentors/${user.uid}/resources`));
    const querySnapshot = await getDocs(resourcesQuery);
    setUploadHistory(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))); // Include document ID
  };

  const handleDelete = async (resourceId, filename) => {
    try {
      // Delete from Firestore using the document ID
      const resourceRef = doc(firestore, `mentors/${user.uid}/resources`, resourceId);
      await deleteDoc(resourceRef);

      // Delete from Firebase Storage
      const storageRef = ref(storage, `mentors/${filename}`);
      await deleteObject(storageRef);

      alert('File deleted successfully!');
      fetchUploadHistory(); // Refresh upload history
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Error deleting file: ' + error.message);
    }
  };

  // Generate grades based on fromGrade and toGrade
  const grades = Array.from({ length: toGrade - fromGrade + 1 }, (_, i) => fromGrade + i);

  return (
    <div style={sectionStyle}>
      <ResourcesHeader />
      <Container className="mentor-resources-container">
      <h3 style={{ fontWeight: 'bold' }}>
                    Welcome, {username}
                </h3>
        <div className="main-content">
          <div className="upload-section">
            <h3 className="upload-header">Upload New Resource</h3>
            <div className="upload-form-container">
              <div className="upload-input">
                <h4 style={{ fontSize: '22px' }}>Subject : {subject}</h4> {/* Display subject in larger font */}
              </div>

              <div className="upload-input">
                <label htmlFor="grade">Grade</label>
                <select id="grade" value={grade} onChange={(e) => setGrade(e.target.value)}>
                  <option value="">Select Grade</option>
                  {grades.map((grade) => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
              </div>

              <div className="upload-input">
                <label htmlFor="resourceFile">Resource File</label>
                <input type="file" id="resourceFile" onChange={handleFileChange} />
              </div>

              <Button variant="primary" className="btn-upload" onClick={handleUpload}>Upload</Button>
            </div>
          </div>

          <div className="history-section">
            <h3 className="mentor-resources-title">Your Uploaded Resources</h3>
            {uploadHistory.length === 0 ? (
              <p>No resources uploaded yet.</p>
            ) : (
              <div className="upload-history">
                <ul>
                  {uploadHistory.map((res, index) => (
                    <li key={index}>
                      <a href={res.accesstoken} target="_blank" rel="noopener noreferrer">
                        {res.filename}
                      </a> - {res.grade} - {res.subject}
                      <Button 
                        variant="danger" 
                        className="btn-delete" 
                        onClick={() => handleDelete(res.id, res.filename)} // Pass ID and filename
                      >
                        Delete
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
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

export default MentorResources;
