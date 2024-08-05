const express = require('express');
const axios = require('axios');
const router = express.Router();

// Fetch top headlines
router.get('/top-headlines', async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        country: 'us',
        apiKey: process.env.NEWS_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Failed to fetch news' });
  }
});

module.exports = router;
