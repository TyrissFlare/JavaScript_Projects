import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function News() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news/top-headlines');
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <button className="back-button" onClick={handleBack}>Back</button>
      <h2>Latest News</h2>
      <div className="news-container">
        {articles.map((article, index) => (
          <div className="news-card" key={index}>
            {article.urlToImage && (
              <div className="news-image-wrapper">
                <img src={article.urlToImage} alt="news" className="news-image" />
              </div>
            )}
            <div className="news-content">
              <h3 className="news-title">{article.title}</h3>
              <p className="news-description">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">Read more</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
