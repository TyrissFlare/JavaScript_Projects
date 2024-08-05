import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import News from './components/News';
import FileUpload from './components/FileUpload';
import './App.css';

function App() {
  const isLoggedIn = () => {
    return !!localStorage.getItem('user');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/landing" />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/news" element={isLoggedIn() ? <News /> : <Navigate to="/login" />} />
          <Route path="/upload" element={isLoggedIn() ? <FileUpload /> : <Navigate to="/login" />} />
          <Route path="/logout" element={isLoggedIn() ? <Logout /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
