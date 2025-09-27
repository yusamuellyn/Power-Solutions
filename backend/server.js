require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000; // or 5000, or anything you want

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const API_KEY = process.env.API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

app.post('/api/gemini', async (req, res) => {
  try {
    const response = await axios.post(API_URL, req.body, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('API error:', error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data?.error || 'An error occurred'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});