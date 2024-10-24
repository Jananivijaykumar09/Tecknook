import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { auth, firestore } from '../firebase'; // Adjust the import according to your Firebase config
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import "./ProfileModal.css";

const ProfileModal = ({ show, handleClose }) => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    userType: '',
    grade: '',
    board: '',
    fromGrade: '',
    toGrade: '',
    subject: '',
    qualifications: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      }
      setLoading(false);
    };

    if (show) {
      fetchUserData();
    }
  }, [show]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(firestore, 'users', user.uid);
      await updateDoc(userDocRef, userData);
      handleClose(); // Close modal after update
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Profile Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Common Fields */}
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              disabled // Disable if you don't want to allow changes
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              disabled // Disable if you don't want to allow changes
            />
          </Form.Group>

          {/* Conditional Fields for Student */}
          {userData.userType === 'student' && (
            <>
              <Form.Group controlId="formGrade">
                <Form.Label>Grade</Form.Label>
                <Form.Control
                  type="text"
                  name="grade"
                  value={userData.grade}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </>
          )}

          {/* Conditional Fields for Mentor */}
          {userData.userType === 'mentor' && (
            <>
              <Form.Group controlId="formFromGrade">
                <Form.Label>From Grade</Form.Label>
                <Form.Control
                  type="text"
                  name="fromGrade"
                  value={userData.fromGrade}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formToGrade">
                <Form.Label>To Grade</Form.Label>
                <Form.Control
                  type="text"
                  name="toGrade"
                  value={userData.toGrade}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={userData.subject}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formQualifications">
                <Form.Label>Qualifications</Form.Label>
                <Form.Control
                  as="textarea"
                  name="qualifications"
                  value={userData.qualifications.join(', ')} // Display as comma-separated values
                  onChange={handleInputChange}
                />
              </Form.Group>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button  className = "profile-button secondary" variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className = "profile-button primary" variant="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
