import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await axios.post('/api/auth/logout', {}, { withCredentials: true });
        localStorage.removeItem('user');
        alert('Logout successful');
        navigate('/landing');
      } catch (error) {
        console.error('Logout failed:', error);
        alert('Logout failed');
      }
    };

    performLogout();
  }, [navigate]);

  return null;
}

export default Logout;
