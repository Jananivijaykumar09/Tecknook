import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VideoHeader from './VideoHeader';  // Import the new header component
import './Video.css';  // Add your custom styles here

const VideoPage = () => {
    const navigate = useNavigate();  // Changed from useHistory to useNavigate
    const location = useLocation();
    const { videoUrl } = location.state || {};

    const handleBackToHome = () => {
        navigate('/');  // Changed from history.push to navigate
    };

    return (
        <div className="video-page" style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundImage: `url('${process.env.PUBLIC_URL}/videobg.jpg')`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center', 
            padding: '20px' 
        }}>
            <VideoHeader />  {/* Use the new header component */}
            <div className="video-container">
                {videoUrl ? (
                    <video width="100%" controls>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <p>No video selected</p>
                )}
            </div>
        </div>
    );
};

export default VideoPage;
