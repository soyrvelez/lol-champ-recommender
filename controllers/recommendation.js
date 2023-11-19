const express = require('express');
const router = express.Router();
const OpenAIAPI = require('openai');
const openai = new OpenAIAPI({ apiKey: process.env.OPENAI_API_KEY });
const db = require('../models');
const championListURL = 'https://ddragon.leagueoflegends.com/cdn/13.22.1/data/en_US/champion.json';

router.post('/recommend', async (req, res) => {  // Marked as async
  try {
    const { id } = req.user.get();
    console.log(id);
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).send('A prompt is required');
    }

    const champion = await getChampionRecommendation(prompt);
    if (champion) {
      const championExists = await isChampionPresent(champion);
      if (championExists) {
        const championLowercase = champion.toLowerCase();
        console.log(championLowercase);

        // create recommendation in database
        const newRecommendation = await createRecommendation(id, prompt, champion);
        console.log(newRecommendation);

        res.redirect(`/recommendation/${championLowercase}`);
      } else {
        res.status(404).render('404');
      }
    } else {
      res.status(500).send('Error getting recommendation');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

router.get('/:champion', async (req, res) => {
  try {
    const champion = req.params.champion
    // Get champion data
    const championData = await getChampionData(champion);
    res.render('recommendation', { champion, championData });
  } catch (error) {
    console.log("the following error ocurred >>>", error);
  }
});

async function getChampionRecommendation(prompt) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "Users will share their current vibe. Based on their input, you will assess which league of legends champion would best match their current vibe so they can have the most fun playing. Your response should only include the name of the champion and nothing else. If you cant find a champion based on the prompt just recommend Skarner"
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

async function isChampionPresent(champion) {
  try {
    const response = await fetch(championListURL);
    const data = await response.json();
    return data.data.hasOwnProperty(champion);
  } catch (error) {
    console.log('Error fetching data', error);
    return false;
  }
};

async function createRecommendation(id, prompt, champion) {
  try {
    const newRecommendation = await db.recommendation.create({
      userId: id,
      prompt: prompt,
      recommendedChampion: champion
    });
    console.log('new recc >>>', newRecommendation);
    return newRecommendation;
  } catch (error) {
    console.log('new reccommendation was not created b/c of', error);
  }
};

async function getChampionData(champion) {
  try {
    const championCapitalized = champion.charAt(0).toUpperCase() + champion.slice(1);

    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/13.22.1/data/en_US/champion/${championCapitalized}.json`);
    const championData = await response.json();
    console.log('debugging this >>>', championData.data[championCapitalized]);
    return championData.data[championCapitalized];
  } catch (error) {
    console.log('champion data could not be retrieved because of >>>', error);
  }
};

module.exports = router;
