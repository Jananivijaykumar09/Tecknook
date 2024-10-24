import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import Home from './components/Home';
import LoginRegister from './components/LoginRegister';
import VideoPage from './components/Video';
import MentorDashboard from './components/MentorDashboard';
import MentorAssessmentAndQuestionPage from './components/MentorAssesmentHosting';
import StudentDashboard from './components/StudentDashboard';
import BachelorDegrees from './components/BacherlorDegrees';
import CompetitiveExams from './components/CompetitiveExams'; // Import the new component
import CareerInformation from './components/CareerInformation';
import StudentAssessmentSelection from './components/StudentAssesmentSelection';
import StudentAssessmentPage from './components/StudentAssesmentPage';
import MentorComments from './components/MentorComments';
import StudentComments from './components/StudentComments';
import MentorResources from './components/MentorResources';
import StudentResources from './components/StudentResources';
import LoanScholarshipDetails from './components/LoanScholarshipDetails';


const App = () => {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/mentor-dashboard" element={<MentorDashboard />} /> {/* Add MentorDashboard route */}
        {/* Use the combined component for mentor assessment and question posting */}
        <Route path="/mentor-assessment" element={<MentorAssessmentAndQuestionPage />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} /> {/* Add StudentDashboard route */}
        <Route path="/bachelor-degrees" element={<BachelorDegrees />} />
        <Route path="/career-information" element={<CareerInformation />} />
        <Route path="/competitive-exams" element={<CompetitiveExams />} /> {/* New route */}
        <Route path="/loan-scholarship-details" element={<LoanScholarshipDetails />} /> {/* Updated path */}
        <Route path="/student-assessment-selection" element={<StudentAssessmentSelection />} /> {/* Add StudentAssessmentSelection route */}
        <Route path="/student-assessment-page" element={<StudentAssessmentPage />} /> {/* Add route for StudentAssessmentPage */}
        {/* Add routes for MentorComments and StudentComments */}
        <Route path="/mentor-comments" element={<MentorComments />} />
        <Route path="/student-comments" element={<StudentComments />} />
        <Route path="/student-resources" element={<StudentResources />} /> {/* Add StudentResources route */}
        <Route path="/mentor-resources" element={<MentorResources />} /> {/* Add MentorResources route */}
     </Routes>
    </Router>
  );
};

export default App;