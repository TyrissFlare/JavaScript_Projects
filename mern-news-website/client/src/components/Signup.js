import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', { username, password }, { withCredentials: true });
      alert('Signup successful: ' + response.data.message);
      navigate('/login'); 
    } catch (error) {
      console.error('Signup failed:', error.response?.data?.message || error.message);
      setError('Signup failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div>
      <button className="back-button" onClick={handleBack}>Back</button>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
