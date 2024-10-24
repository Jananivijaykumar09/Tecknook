import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaUser, FaLock, FaEnvelope, FaBook } from "react-icons/fa";
import { auth, firestore } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import './LoginRegister.css';
import '../index.css';
import LoginRegisterHeader from './LoginRegisterHeader'; // Import the header component

const LoginRegister = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const actionParam = queryParams.get('action') || 'login';

  const [action, setAction] = useState(actionParam);
  const [userType, setUserType] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [subject, setSubject] = useState(''); // Add subject state
  const [grade, setGrade] = useState(''); // For student grade
  const [fromGrade, setFromGrade] = useState(''); // For mentor from grade
  const [toGrade, setToGrade] = useState(''); // For mentor to grade
  const [qualifications, setQualifications] = useState(''); // For mentor qualifications
  const [board, setBoard] = useState('cbse'); // For mentor board type

  useEffect(() => {
    setAction(actionParam);
  }, [actionParam]);

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  // This function returns the class name for the wrapper based on userType
  const getWrapperClass = () => {
    return userType === 'mentor' ? 'wrapper mentor-active' : 'wrapper';
  };

  const validatePassword = (password) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      alert('Password must be at least 6 characters long, include uppercase and lowercase letters, at least one number, and one special character.');
      return;
    }

    // Validate student grade
    if (userType === 'student' && (grade < 6 || grade > 12)) {
      alert('Grade must be between 6 and 12.');
      return;
    }

    // Validate mentor grades
    if (userType === 'mentor') {
      if (fromGrade < 6 || fromGrade > 12 || toGrade < 6 || toGrade > 12 || fromGrade > toGrade) {
        alert('From and To grades must be between 6 and 12 and from grade should be less than or equal to to grade.');
        return;
      }
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        username,
        email,
        userType,
        ...(userType === 'student' && { grade }), // Include grade if student
        ...(userType === 'mentor' && {
          subject, // Include subject for mentor
          fromGrade,
          toGrade,
          qualifications: qualifications.split(','), // Store qualifications as an array
          board,
        }), // Include mentor details if mentor
      };

      await setDoc(doc(firestore, 'users', user.uid), userData);

      // If the user is a mentor, add their details to the 'mentors' collection
      if (userType === 'mentor') {
        await setDoc(doc(firestore, 'mentors', user.uid), {
          subject, // Save the subject
          fromGrade,
          toGrade,
          qualifications: qualifications.split(','), // Store qualifications as an array
          board,
        });
      }

      if (userType === 'student') {
        await setDoc(doc(firestore, 'students', user.uid), { grade });
      }

      alert('User registered successfully!');
    } catch (error) {
      console.error('Error signing up:', error);
      alert(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      // Redirect to a mentor page if user is mentor
      if (userType === 'mentor') {
        window.location.href = "/mentor-dashboard";
      }
      if (userType === 'student') {
        window.location.href = "/student-dashboard";
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert(error.message);
    }
  };

  const sectionStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url('${process.env.PUBLIC_URL}/banner2.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div>
      <LoginRegisterHeader />
      <section id="login-signup-section" style={sectionStyle}>
        <div className="login-register-form-box">
          <div className={`wrapper ${action === 'register' ? 'active' : ''}`}>
            {action === 'login' && (
              <div className='form-box login'>
                <form onSubmit={handleLogin}>
                  <h1 className="login-title">Login</h1>
                  <div className="user-type-selection">
                    <label>
                      <input
                        type="radio"
                        value="mentor"
                        checked={userType === 'mentor'}
                        onChange={handleUserTypeChange}
                      /> Mentor
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="student"
                        checked={userType === 'student'}
                        onChange={handleUserTypeChange}
                      /> Student
                    </label>
                  </div>
                  <div className="input-box login-input-box">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <FaUser className='icon icon-login' />
                  </div>
                  <div className="input-box login-input-box">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <FaLock className='icon icon-login' />
                  </div>
                  <div className="remember-forgot login-remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                  </div>
                  <button type="submit" className="login-button">Login</button>
                  <div className="register-link login-register-link">
                    <p>Don't have an account? <a href="/login?action=register">SignUp</a></p>
                  </div>
                </form>
              </div>
            )}

            {action === 'register' && (
              <div className='form-box register'>
                <form onSubmit={handleRegister}>
                  <h1 className="register-title">SignUp</h1>
                  <div className="user-type-selection">
                    <label>
                      <input
                        type="radio"
                        value="mentor"
                        checked={userType === 'mentor'}
                        onChange={handleUserTypeChange}
                      /> Mentor
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="student"
                        checked={userType === 'student'}
                        onChange={handleUserTypeChange}
                      /> Student
                    </label>
                  </div>
                  <div className="input-box register-input-box">
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <FaUser className='icon icon-register' />
                  </div>
                  <div className="input-box register-input-box">
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <FaEnvelope className='icon icon-register' />
                  </div>
                  <div className="input-box register-input-box">
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <FaLock className='icon icon-register' />
                  </div>
                  {userType === 'student' && (
                    <div className="input-box register-input-box">
                      <input
                        type="number"
                        placeholder="Grade (6-12)"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        required
                      />
                      <FaBook className='icon icon-register' />
                    </div>
                  )}
                  {userType === 'mentor' && (
                    <div className="mentor-details">
                      <div className="input-box register-input-box">
                        <input
                          type="text"
                          placeholder="Subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                        />
                        <FaBook className='icon icon-register' />
                      </div>
                      <div className="mentor-grade-selection">
                        <div className="input-box register-input-box">
                          <input
                            type="number"
                            placeholder="From Grade (6-12)"
                            value={fromGrade}
                            onChange={(e) => setFromGrade(e.target.value)}
                            required
                          />
                        </div>
                        <div className="input-box register-input-box">
                          <input
                            type="number"
                            placeholder="To Grade (6-12)"
                            value={toGrade}
                            onChange={(e) => setToGrade(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="input-box register-input-box">
                        <input
                          type="text"
                          placeholder="Qualifications (comma separated)"
                          value={qualifications}
                          onChange={(e) => setQualifications(e.target.value)}
                          required
                        />
                      </div>
                      <div className="board-selection">
                        <label>
                          <input
                            type="radio"
                            value="cbse"
                            checked={board === 'cbse'}
                            onChange={(e) => setBoard(e.target.value)}
                          /> CBSE
                        </label>
                        <label>
                          <input
                            type="radio"
                            value="samacheer"
                            checked={board === 'samacheer'}
                            onChange={(e) => setBoard(e.target.value)}
                          /> Samacheer
                        </label>
                      </div>
                    </div>
                  )}
                  <button type="submit" className="register-button">SignUp</button>
                  <div className="login-link login-register-link">
                    <p>Already have an account? <a href="/login?action=login">Login</a></p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginRegister;
