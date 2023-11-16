const express = require('express');
const router = express.Router();
const { Recommendation } = require('../models');

router.post('/recommend', (req, res) => {
  console.log(req.body);
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).send('A prompt is required');
    }


  }
});

module.exports = router;
