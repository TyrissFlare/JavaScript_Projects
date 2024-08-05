import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { username, password }, { withCredentials: true });
      alert(response.data.message);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setError('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <button className="back-button" onClick={handleBack}>Back</button>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      {error && (
        <div>
          <p>Not registered? <button onClick={handleSignupRedirect} className="link-button">Sign Up</button></p>
        </div>
      )}
    </div>
  );
}

export default Login;
