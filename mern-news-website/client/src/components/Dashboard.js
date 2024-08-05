import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaNewspaper, FaCloudUploadAlt, FaSignOutAlt } from 'react-icons/fa'; // Correct import statement

function Dashboard() {
  const navigate = useNavigate();

  const handleNews = () => {
    navigate('/news');
  };

  const handleUpload = () => {
    navigate('/upload');
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    navigate('/landing');
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="dashboard">
      <button className="back-button" onClick={handleBack}>Back</button>
      <h2>Menu</h2>
      <div className="tiles">
        <div className="tile" onClick={handleNews}>
          <FaNewspaper size={40} className="tile-icon" />
          <h3>View News</h3>
        </div>
        <div className="tile" onClick={handleUpload}>
          <FaCloudUploadAlt size={40} className="tile-icon" />
          <h3>Upload Files</h3>
        </div>
        <div className="tile" onClick={handleLogout}>
          <FaSignOutAlt size={40} className="tile-icon" />
          <h3>Logout</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
