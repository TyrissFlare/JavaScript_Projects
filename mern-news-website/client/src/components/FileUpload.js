import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadUrl(response.data.url);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('File upload failed:', error);
      alert('File upload failed');
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <form>
      <h2>Upload File</h2>
      <input type="file" onChange={handleFileChange} />
      <button type="button" onClick={handleUpload}>Upload</button>
      {uploadUrl && (
        <div className="uploaded-file">
          <p>Uploaded file:</p>
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer">{uploadUrl}</a>
        </div>
      )}
      <button className="back-button" type="button" onClick={handleBack}>Back</button>
    </form>
  );
}

export default FileUpload;
