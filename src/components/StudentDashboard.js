import React , { useState, useEffect }from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'; 
import './StudentDashboard.css';
import pcImage from './pc-image.png'; 
import assesmentImage from './assesment.png'; // Import assessment image
import resourceImage from './resource.png'; // Import resource image
import commentImage from './comment.png'; // Import comment image
import StudentDashboardHeader from "./StudentDashboardHeader";
import { firestore, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const StudentDashboard = () => {
  const navigate = useNavigate(); 

  const cards = [
    {
      title: "Assessments",
      text: "Access and complete assessments assigned to you.",
      link: "/student-assessment-selection",
      bgColor: "linear-gradient(135deg, #FFC371, #FF5F6D)",
      image: assesmentImage, // Use the imported image for assessments
    },
    {
      title: "Resources",
      text: "Access and view resources posted by mentors.",
      link: "/student-resources",
      bgColor: "linear-gradient(135deg, #8E2DE2, #4A00E0)",
      image: resourceImage, // Use the imported image for resources
    },
    {
      title: "Comments",
      text: "Post Comments, Feedback and View the Response from the instructors.",
      link: "/student-comments",
      bgColor: "linear-gradient(135deg, #56CCF2, #2F80ED)",
      image: commentImage, // Use the imported image for comments
    },
  ];

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
            setUsername(userData.username);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsername();
  }, []);

  const handleCardClick = (link) => {
    navigate(link);
  };

  return (
    <>
      <StudentDashboardHeader username={username} /> {/* Pass username as a prop */}
      <Container fluid className="student-dashboard">
        <Row className="d-flex flex-nowrap justify-content-between">
          {cards.map((card, index) => (
            <Col key={index} className="d-flex justify-content-center mb-4">
              <Card
                className="custom-card glass-effect"
                style={{ background: card.bgColor }}
              >
                <div className="icon-container">
                  <img src={card.image} alt={`${card.title} Icon`} className="icon-image" />
                </div>
                <Card.Body className="d-flex flex-column align-items-center text-center">
                  <Card.Title className="custom-card-title mt-3">{card.title}</Card.Title>
                  <Card.Text className="custom-card-text">{card.text}</Card.Text>
                  <Button
                    variant="light"
                    onClick={() => handleCardClick(card.link)}
                    className="custom-button mt-auto"
                  >
                    Go to {card.title}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default StudentDashboard;
