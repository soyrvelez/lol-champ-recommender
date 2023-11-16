const express = require('express');
const router = express.Router();
const OpenAIAPI = require('openai');
const openai = new OpenAIAPI({ apiKey: process.env.OPENAI_API_KEY });
const passport = require('../config/ppConfig');
const session = require('express-session');
const isLoggedIn = require('../middleware/isLoggedIn');
const db = require('../models');

router.post('/recommend', async (req, res) => {  // Marked as async
  console.log(req.body);
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).send('A prompt is required');
    }

    const champion = await getChampionRecommendation(prompt);
    if (champion) {
      const championLowercase = champion.toLowerCase();


      console.log(championLowercase);
      res.redirect(`/recommendation/${championLowercase}`);
    } else {
      res.status(500).send('Error getting recommendation');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/:champion', (req, res) => {
  const champion = req.params.champion
  res.render('recommendation', { champion });
});

async function getChampionRecommendation(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "Users will share information about their day and current mood with you. Based on their input, you will assess which league of legends champion would best match their current mood and day they're having. Your response should only include the name of the champion and nothing else."
        },
        {
          "role": "user",
          "content": prompt
        }
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = router;
