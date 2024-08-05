import React from 'react';
import { useNavigate } from 'react-router-dom';
import welcomeImage from '../Images/Welcome.jpg'; 

function Landing() {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="landing">
      <img src={welcomeImage} alt="Welcome" className="welcome-image" />
      <p>Please choose an option to continue:</p>
      <button className="purple-button" onClick={handleSignup}>Sign Up</button>
      <button className="purple-button" onClick={handleLogin}>Log In</button>
    </div>
  );
}

export default Landing;
