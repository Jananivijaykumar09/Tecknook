// src/pages/CompetitiveExams.js
import React from 'react';
import './CompetitiveExams.css'; // Import the CSS file for styling
import NextStepHeader from './NextstepHeader';

const exams = [
  {
    title: "Indian Economic Service Examination (IES)",
    link: "https://www.ies.gov.in/ies-aspirants.php",
    eligibility: "Students having a Bachelor’s Degree in Economics/Statistics can apply.",
    description: "The IES exam is conducted by UPSC for recruiting economists to serve in various departments of the Indian government. This exam ensures that qualified economists are selected to formulate policies on public finance and economic development."
  },
  {
    title: "Indian Statistical Service Examination (ISS)",
    link: "https://upsc.gov.in/examinations/Indian%20Economic%20Service%20-%20Indian%20Statistical%20Service%20Examination%2C%202024",
    eligibility: "Students with a background in Statistics can apply.",
    description: "The ISS exam is a specialized exam for recruiting professionals in the field of statistics for government agencies. It ensures expertise in statistical techniques and analysis, essential for policy formulation and data-driven decision-making."
  },
  {
    title: "Civil Services Examination (CSE)",
    link: "hhttps://upsc.gov.in/examinations/Civil%20Services%20%28Main%29%20Examination%2C%202023",
    eligibility: "Graduates from any stream can apply for this exam.",
    description: "CSE is one of the most prestigious examinations in India, conducted by the Union Public Service Commission (UPSC). It is meant for recruitment to various civil services of the Government of India, including IAS, IPS, and IFS. The exam is held in three stages: Prelims, Mains, and Interview."
  },
  {
    title: "Combined Defence Services Examination (CDSE)",
    link: "https://upsc.gov.in/examinations/Combined%20Defence%20Services%20Examination%20%28I%29%2C%202024",
    eligibility: "Graduates can apply.",
    description: "The CDSE is conducted by UPSC for recruiting officers into the Indian Armed Forces (Army, Navy, and Air Force). It consists of a written exam followed by an interview conducted by the Services Selection Board (SSB)."
  },
  {
    title: "National Defence Academy & Naval Academy Examination (NDA/NA)",
    link: "http://upsc.gov.in/general/ndana.htm",
    eligibility: "Graduates with Physics/Chemistry/Maths as their subjects can apply.",
    description: "NDA & NA exams are conducted by UPSC for the recruitment of candidates to the National Defence Academy and the Naval Academy. These exams offer a route for young aspirants to become officers in the Indian Armed Forces."
  },
  {
    title: "Combined Medical Services Examination (CMS)",
    link: "http://upsc.gov.in/general/cms.htm",
    eligibility: "Graduates with a Medical Science background can apply.",
    description: "CMS is conducted by UPSC for recruiting medical officers to serve in various government hospitals and organizations, including railways and municipal health services."
  },
  {
    title: "Engineering Services Examination (ESE/IES)",
    link: "http://upsc.gov.in/general/engg.htm",
    eligibility: "Engineering Graduates can apply.",
    description: "ESE, also known as IES, is conducted by UPSC to recruit engineers for various technical positions in government departments. The exam tests technical knowledge in civil, mechanical, electrical, and electronics engineering."
  },
  {
    title: "Staff Selection Commission (SSC) Examinations",
    link: "http://ssc.nic.in/sscpage1.asp",
    eligibility: "Graduates in various disciplines can apply.",
    description: "SSC conducts a variety of exams to recruit staff for different departments of the Government of India. Some popular exams include SSC CGL (Combined Graduate Level) for higher-level posts and SSC CHSL (Combined Higher Secondary Level) for clerical positions."
  },
  {
    title: "Reserve Bank of India (RBI) Services Exams",
    link: "http://www.rbi.org.in/home.aspx",
    eligibility: "Graduates in any discipline can apply.",
    description: "RBI conducts exams for recruiting officers and assistants. The most prestigious is the RBI Grade B exam, which recruits officers for policymaking and supervisory roles in India's central bank."
  },
  {
    title: "National Bank for Agriculture & Rural Development (NABARD) Exams",
    link: "https://www.nabard.org/english/home.aspx",
    eligibility: "Graduates with specific percentage criteria can apply.",
    description: "NABARD conducts exams for positions like Development Officers and Agricultural Officers. It focuses on rural development and financial inclusion policies. Graduates with degrees in agriculture or related fields are preferred."
  },
  {
    title: "Telecom Officers Examination",
    link: "http://www.dot.gov.in/",
    eligibility: "Graduates in relevant fields can apply.",
    description: "This exam is conducted for recruiting officers in the Department of Telecommunications. The exam focuses on technical subjects like electronics, communication, and IT."
  },
  {
    title: "Graduate Aptitude Test in Engineering (GATE)",
    link: "http://gate.iitk.ac.in/GATE2015/",
    eligibility: "Engineering Graduates are eligible to apply.",
    description: "GATE is conducted for admissions to postgraduate programs in engineering and for recruitment in various public sector companies (PSUs). It tests the comprehensive understanding of engineering subjects."
  },
  {
    title: "Common Entrance Examination for Design (CEED)",
    link: "http://www.idc.iitb.ac.in/admissions/ceed-details.html",
    eligibility: "Students who have secured Graduation in BE/B.Tech/B.Arch.",
    description: "CEED is conducted by IITs for admission to Master of Design (M.Des) programs. It tests creativity, drawing skills, and visual perception."
  },
  {
    title: "National Institute of Fashion Technology (NIFT) Entrance Exam",
    link: "http://www.nift.ac.in/",
    eligibility: "B.F.Tech from NIFT or B.E/B.Tech from any University.",
    description: "NIFT entrance exam is conducted for admission to various undergraduate and postgraduate programs in fashion technology, design, and management."
  },
  {
    title: "Xavier Aptitude Test (XAT)",
    link: "http://xatonline.net.in/",
    eligibility: "Candidates must complete Graduation from a recognized University.",
    description: "XAT is conducted by XLRI for admissions to management programs. It is one of the most prestigious MBA entrance exams in India, known for its high level of difficulty."
  }
];

const CompetitiveExams = () => {
    return (
      <div className="competitive-exams-container">
        <NextStepHeader /> {/* Add the new header here */}
        <h1>Competitive Exams After Graduation</h1>
        <ul>
          {exams.map((exam, index) => (
            <li key={index}>
              <strong>{exam.title}:</strong> {exam.eligibility}
              <p>{exam.description}</p>
              <a href={exam.link} target="_blank" rel="noopener noreferrer">Visit</a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default CompetitiveExams;
