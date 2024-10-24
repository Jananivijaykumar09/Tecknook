// src/pages/CareerInformation.js
import React, { useState } from 'react';
import './CareerInformation.css'; // Import the CSS file
import NextStepHeader from './NextstepHeader';

// Expanded job data
const jobData = {
  after10th: {
    nonGovernment: [
      { title: "Data Entry Operator", eligibility: "10th pass, basic computer knowledge, typing skills." },
      { title: "Sales Executive", eligibility: "10th pass, good communication skills." },
      { title: "Field Sales Representative", eligibility: "10th pass, excellent communication skills." },
      { title: "Telecaller", eligibility: "10th pass, communication skills, basic computer knowledge." },
      { title: "Office Assistant", eligibility: "10th pass, organizational skills, basic computer knowledge." },
      { title: "Retail Sales Associate", eligibility: "10th pass, customer service skills." },
      { title: "Delivery Boy", eligibility: "10th pass, valid driving license." },
      { title: "Customer Support Executive", eligibility: "10th pass, good communication skills." },
      { title: "Workshop Technician", eligibility: "10th pass, technical skills." },
      { title: "Security Guard", eligibility: "10th pass, physical fitness." },
      { title: "Lab Assistant", eligibility: "10th pass, basic science knowledge." },
      { title: "Fitness Trainer", eligibility: "10th pass, physical fitness, training skills." },
      { title: "Gardener", eligibility: "10th pass, basic gardening skills." },
      { title: "Cleaning Staff", eligibility: "10th pass, physical fitness." },
      { title: "Helper in Workshop", eligibility: "10th pass, basic technical skills." },
      { title: "Housekeeping Staff", eligibility: "10th pass, organizational skills." },
      { title: "Event Coordinator Assistant", eligibility: "10th pass, organizational skills." },
      { title: "Food Delivery Executive", eligibility: "10th pass, valid driving license." },
      { title: "Call Center Executive", eligibility: "10th pass, good communication skills." },
      { title: "Construction Helper", eligibility: "10th pass, physical fitness." },
      { title: "Retail Store Manager Assistant", eligibility: "10th pass, management skills." },
      { title: "F&B Service Staff", eligibility: "10th pass, customer service skills." },
      { title: "Data Entry Clerk", eligibility: "10th pass, typing skills." },
      { title: "Transport Coordinator Assistant", eligibility: "10th pass, organizational skills." },
      { title: "Warehouse Assistant", eligibility: "10th pass, organizational skills." },
      { title: "Maintenance Worker", eligibility: "10th pass, basic technical skills." },
      { title: "Labourer", eligibility: "10th pass, physical fitness." },
      { title: "Postal Assistant", eligibility: "10th pass, good communication skills." },
      { title: "Library Assistant", eligibility: "10th pass, organizational skills." },
      { title: "Personal Driver", eligibility: "10th pass, valid driving license." },
      { title: "Painter", eligibility: "10th pass, basic painting skills." },
      { title: "Plumber Assistant", eligibility: "10th pass, basic plumbing skills." },
      { title: "Electrician Helper", eligibility: "10th pass, basic electrical skills." },
      { title: "Retail Cashier", eligibility: "10th pass, basic math skills." },
      { title: "Packing Staff", eligibility: "10th pass, organizational skills." },
      { title: "Delivery Executive", eligibility: "10th pass, valid driving license." },
      { title: "Production Assistant", eligibility: "10th pass, basic technical skills." },
      { title: "Receptionist Assistant", eligibility: "10th pass, good communication skills." },
      { title: "Office Boy", eligibility: "10th pass, organizational skills." },
      { title: "Telesales Executive", eligibility: "10th pass, sales skills." },
      { title: "Account Assistant", eligibility: "10th pass, basic accounting knowledge." },
      { title: "Travel Consultant Assistant", eligibility: "10th pass, good communication skills." },
      { title: "Courier Delivery Executive", eligibility: "10th pass, valid driving license." },
      { title: "Document Verification Assistant", eligibility: "10th pass, attention to detail." },
      { title: "Public Relations Assistant", eligibility: "10th pass, communication skills." },
      { title: "Event Management Assistant", eligibility: "10th pass, organizational skills." },
      { title: "Quality Control Assistant", eligibility: "10th pass, attention to detail." },
      { title: "Technical Support Assistant", eligibility: "10th pass, basic technical skills." }
    ],
    government: [
      { title: "Railway Ticketing Assistant", eligibility: "10th pass, basic computer knowledge.", test: "Railway recruitment exams" },
      { title: "Police Constable", eligibility: "10th pass, physical fitness.", test: "Physical Efficiency Test (PET), written test" },
      { title: "Army Soldier", eligibility: "10th pass, physical fitness.", test: "Physical Efficiency Test (PET), written test" },
      { title: "Fireman", eligibility: "10th pass, physical fitness.", test: "Physical Efficiency Test (PET), written test" },
      { title: "Government Clerk", eligibility: "10th pass, basic computer knowledge.", test: "Written test" },
      { title: "Postal Assistant", eligibility: "10th pass, basic computer knowledge.", test: "Written test" },
      { title: "Village Revenue Officer", eligibility: "10th pass, local language proficiency.", test: "Written test" },
      { title: "Junior Assistant", eligibility: "10th pass, basic computer knowledge.", test: "Written test" },
      { title: "Constable in Central Armed Police Forces", eligibility: "10th pass, physical fitness.", test: "Physical Efficiency Test (PET), written test" },
      { title: "Field Assistant", eligibility: "10th pass, local language proficiency.", test: "Written test" },
      { title: "Data Entry Operator", eligibility: "10th pass, basic computer knowledge.", test: "Written test" },
      { title: "Forest Guard", eligibility: "10th pass, physical fitness.", test: "Physical Efficiency Test (PET), written test" },
      { title: "Nursing Assistant", eligibility: "10th pass, basic medical knowledge.", test: "Written test" },
      { title: "Security Assistant", eligibility: "10th pass, physical fitness.", test: "Written test" },
      { title: "Lab Assistant in Government Schools", eligibility: "10th pass, basic science knowledge.", test: "Written test" },
      { title: "Transport Assistant", eligibility: "10th pass, basic vehicle knowledge.", test: "Written test" },
      { title: "Water Supply Assistant", eligibility: "10th pass, basic technical skills.", test: "Written test" },
      { title: "Technical Assistant", eligibility: "10th pass, technical knowledge.", test: "Written test" },
      { title: "Data Entry Clerk in Government Offices", eligibility: "10th pass, typing skills.", test: "Written test" },
      { title: "Health Worker", eligibility: "10th pass, basic medical knowledge.", test: "Written test" },
      { title: "Community Health Assistant", eligibility: "10th pass, basic health knowledge.", test: "Written test" },
      { title: "Public Works Assistant", eligibility: "10th pass, basic technical skills.", test: "Written test" },
      { title: "Animal Husbandry Assistant", eligibility: "10th pass, basic animal care knowledge.", test: "Written test" },
      { title: "Civil Defense Volunteer", eligibility: "10th pass, physical fitness.", test: "Physical Efficiency Test (PET), written test" },
      { title: "Office Attendant", eligibility: "10th pass, organizational skills.", test: "Written test" },
      { title: "Public Relations Assistant in Government", eligibility: "10th pass, communication skills.", test: "Written test" },
      { title: "Junior Clerk", eligibility: "10th pass, basic computer knowledge.", test: "Written test" },
      { title: "Field Survey Assistant", eligibility: "10th pass, local language proficiency.", test: "Written test" },
      { title: "District Coordinator Assistant", eligibility: "10th pass, organizational skills.", test: "Written test" },
      { title: "Village Development Assistant", eligibility: "10th pass, local language proficiency.", test: "Written test" },
      { title: "Legal Assistant", eligibility: "10th pass, basic legal knowledge.", test: "Written test" },
      { title: "Educational Assistant", eligibility: "10th pass, basic educational knowledge.", test: "Written test" },
      { title: "Training Assistant", eligibility: "10th pass, training skills.", test: "Written test" },
      { title: "Cultural Assistant", eligibility: "10th pass, knowledge of local culture.", test: "Written test" },
      { title: "Tourism Assistant", eligibility: "10th pass, basic tourism knowledge.", test: "Written test" },
      { title: "Forest Ranger Assistant", eligibility: "10th pass, basic forest knowledge.", test: "Written test" }
    ]
  },
  after12th: {
    nonGovernment: [
      { title: "Customer Service Executive", eligibility: "12th pass, communication skills." },
      { title: "Technical Support Specialist", eligibility: "12th pass, technical skills." },
      { title: "Sales Manager", eligibility: "12th pass, management skills." },
      { title: "Marketing Executive", eligibility: "12th pass, marketing skills." },
      { title: "Administrative Assistant", eligibility: "12th pass, organizational skills." },
      { title: "Account Executive", eligibility: "12th pass, basic accounting skills." },
      { title: "Office Manager", eligibility: "12th pass, management skills." },
      { title: "HR Assistant", eligibility: "12th pass, communication and organizational skills." },
      { title: "Content Writer", eligibility: "12th pass, writing skills." },
      { title: "Graphic Designer", eligibility: "12th pass, graphic design skills." },
      { title: "Web Developer", eligibility: "12th pass, basic coding skills." },
      { title: "Customer Support Representative", eligibility: "12th pass, communication skills." },
      { title: "Event Planner", eligibility: "12th pass, organizational skills." },
      { title: "Real Estate Agent", eligibility: "12th pass, sales skills." },
      { title: "Data Analyst", eligibility: "12th pass, analytical skills." },
      { title: "Social Media Manager", eligibility: "12th pass, social media skills." },
      { title: "Banking Associate", eligibility: "12th pass, basic banking knowledge." },
      { title: "Travel Agent", eligibility: "12th pass, communication skills." },
      { title: "Insurance Agent", eligibility: "12th pass, basic insurance knowledge." },
      { title: "Retail Manager", eligibility: "12th pass, management skills." },
      { title: "Financial Advisor", eligibility: "12th pass, basic financial knowledge." },
      { title: "Teaching Assistant", eligibility: "12th pass, communication skills." },
      { title: "Sales Coordinator", eligibility: "12th pass, coordination skills." },
      { title: "Research Assistant", eligibility: "12th pass, research skills." },
      { title: "Public Relations Executive", eligibility: "12th pass, communication skills." },
      { title: "Product Manager", eligibility: "12th pass, management skills." },
      { title: "E-commerce Specialist", eligibility: "12th pass, e-commerce skills." },
      { title: "Supply Chain Coordinator", eligibility: "12th pass, organizational skills." },
      { title: "Project Coordinator", eligibility: "12th pass, project management skills." },
      { title: "Customer Relations Manager", eligibility: "12th pass, communication skills." },
      { title: "Business Development Executive", eligibility: "12th pass, sales skills." },
      { title: "Operations Manager", eligibility: "12th pass, management skills." },
      { title: "Administrative Coordinator", eligibility: "12th pass, organizational skills." },
      { title: "Training Coordinator", eligibility: "12th pass, training skills." },
      { title: "Quality Assurance Specialist", eligibility: "12th pass, attention to detail." },
      { title: "Logistics Coordinator", eligibility: "12th pass, organizational skills." },
      { title: "Market Research Analyst", eligibility: "12th pass, research skills." },
      { title: "Digital Marketing Specialist", eligibility: "12th pass, digital marketing skills." },
      { title: "Graphic Design Assistant", eligibility: "12th pass, graphic design skills." },
      { title: "SEO Specialist", eligibility: "12th pass, SEO skills." },
      { title: "Event Coordinator", eligibility: "12th pass, organizational skills." },
      { title: "Insurance Underwriter", eligibility: "12th pass, basic insurance knowledge." },
      { title: "Customer Engagement Specialist", eligibility: "12th pass, communication skills." },
      { title: "Social Media Coordinator", eligibility: "12th pass, social media skills." }
    ],
    government: [
      { title: "Bank Clerk", eligibility: "12th pass, basic math and English.", test: "Banking exams" },
      { title: "Railway Ticket Collector", eligibility: "12th pass, physical fitness.", test: "Railway recruitment exams" },
      { title: "Staff Nurse", eligibility: "12th pass, nursing training.", test: "Nursing exams" },
      { title: "Junior Engineer", eligibility: "12th pass with engineering diploma.", test: "Engineering exams" },
      { title: "Data Entry Operator", eligibility: "12th pass, typing skills.", test: "Written test" },
      { title: "Police Sub-Inspector", eligibility: "12th pass, physical fitness.", test: "Physical Efficiency Test (PET), written test" },
      { title: "Army Soldier", eligibility: "12th pass, physical fitness.", test: "Physical Efficiency Test (PET), written test" },
      { title: "Teaching Assistant", eligibility: "12th pass, teaching skills.", test: "Written test" },
      { title: "Field Officer", eligibility: "12th pass, field experience.", test: "Written test" },
      { title: "Forest Guard", eligibility: "12th pass, physical fitness.", test: "Physical Efficiency Test (PET), written test" },
      { title: "Bank Probationary Officer", eligibility: "12th pass, basic banking knowledge.", test: "Banking exams" },
      { title: "Subordinate Court Assistant", eligibility: "12th pass, basic legal knowledge.", test: "Written test" },
      { title: "Public Health Assistant", eligibility: "12th pass, basic health knowledge.", test: "Written test" },
      { title: "Revenue Inspector", eligibility: "12th pass, local language proficiency.", test: "Written test" },
      { title: "Village Development Officer", eligibility: "12th pass, local language proficiency.", test: "Written test" },
      { title: "Electrician in Government Departments", eligibility: "12th pass with electrician diploma.", test: "Written test" },
      { title: "Mechanical Assistant", eligibility: "12th pass with mechanical training.", test: "Written test" },
      { title: "Civil Assistant", eligibility: "12th pass with civil engineering diploma.", test: "Written test" },
      { title: "Hospital Assistant", eligibility: "12th pass, basic medical knowledge.", test: "Written test" },
      { title: "Public Relations Officer", eligibility: "12th pass, communication skills.", test: "Written test" },
      { title: "Administrative Officer", eligibility: "12th pass, organizational skills.", test: "Written test" },
      { title: "Project Officer", eligibility: "12th pass, project management skills.", test: "Written test" },
      { title: "Junior Clerk", eligibility: "12th pass, basic computer knowledge.", test: "Written test" },
      { title: "Transport Assistant", eligibility: "12th pass, basic vehicle knowledge.", test: "Written test" },
      { title: "Educational Instructor", eligibility: "12th pass, teaching skills.", test: "Written test" },
      { title: "Legal Assistant", eligibility: "12th pass, basic legal knowledge.", test: "Written test" },
      { title: "Cultural Coordinator", eligibility: "12th pass, knowledge of local culture.", test: "Written test" },
      { title: "Tourism Officer", eligibility: "12th pass, basic tourism knowledge.", test: "Written test" },
      { title: "Data Entry Clerk in Government Offices", eligibility: "12th pass, typing skills.", test: "Written test" },
      { title: "Health Education Officer", eligibility: "12th pass, health knowledge.", test: "Written test" },
      { title: "Quality Control Inspector", eligibility: "12th pass, attention to detail.", test: "Written test" },
      { title: "Administrative Assistant in Government", eligibility: "12th pass, organizational skills.", test: "Written test" },
      { title: "Field Survey Officer", eligibility: "12th pass, local language proficiency.", test: "Written test" },
      { title: "Community Health Worker", eligibility: "12th pass, health knowledge.", test: "Written test" },
      { title: "Public Works Inspector", eligibility: "12th pass, basic technical skills.", test: "Written test" },
      { title: "Animal Husbandry Officer", eligibility: "12th pass, animal care knowledge.", test: "Written test" }
    ]
  }
};

const CareerInformation = () => {
    const [selectedLevel, setSelectedLevel] = useState(null);
    const [jobType, setJobType] = useState('all');
  
    const handleCardClick = (level) => {
      setSelectedLevel(level);
      setJobType('all');
    };
  
    const handleJobTypeClick = (type) => {
      setJobType(type);
    };
  
    const renderJobList = () => {
      if (!selectedLevel) return null;
  
      const jobs = jobData[`after${selectedLevel}`][jobType] || [];
  
      return (
        <div className="job-list">
          <h2>Jobs After {selectedLevel === '10th' ? '10th Grade' : '12th Grade'}</h2>
          <div className="filter-buttons">
            <button className="filter-button" onClick={() => handleJobTypeClick('nonGovernment')}>Non-Government Jobs</button>
            <button className="filter-button" onClick={() => handleJobTypeClick('government')}>Government Jobs</button>
          
          </div>
          <ul>
            {jobs.map((job, index) => (
              <li key={index} className="job-card">
                <strong>{job.title}:</strong> {job.eligibility} {job.test && `- Test: ${job.test}`}
              </li>
            ))}
          </ul>
        </div>
      );
    };
  
    return (
      <div className="career-info">
        <NextStepHeader /> {/* Add the new header here */}
        <h1 className="h1career">Career Information</h1>
        <div className="level-buttons">
          <button className="level-button" onClick={() => handleCardClick('10th')}>After 10th Grade</button>
          <button className="level-button" onClick={() => handleCardClick('12th')}>After 12th Grade</button>
        </div>
        {renderJobList()}
      </div>
    );
  };
  
  export default CareerInformation;