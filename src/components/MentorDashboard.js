// MentorDashboard.js
import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './MentorDashboard.css';
import assessmentImage from './assesment.png';
import resourceImage from './resource.png';
import commentImage from './comment.png';
import MentorDashboardHeader from "./MentorDashboardHeader";
import { firestore, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const MentorDashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Assessment",
      text: "Manage and review assessments assigned to students.",
      link: "/mentor-assessment",
      bgColor: "linear-gradient(135deg, #FFC371, #FF5F6D)",
      image: assessmentImage,
    },
    {
      title: "Resources",
      text: "Post resources for Students.",
      link: "/mentor-resources",
      bgColor: "linear-gradient(135deg, #8E2DE2, #4A00E0)",
      image: resourceImage,
    },
    {
      title: "Comments",
      text: "View and respond to comments from students.",
      link: "/mentor-comments",
      bgColor: "linear-gradient(135deg, #56CCF2, #2F80ED)",
      image: commentImage,
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
      <MentorDashboardHeader username={username} /> {/* Pass username here */}
      <Container fluid className="mentor-dashboard">
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

export default MentorDashboard;
