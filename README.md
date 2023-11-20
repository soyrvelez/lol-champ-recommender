# `LoL Recommender`

AI powered vibe-based League of Legends Champion recommendation engine.

## What is it?

This node-based app aims to simplify the decision-making process League of Legends players face when navigating the 160+ playable characters the game offers. LoL Recommender's takes its users' current 'vibe' and matches it with a champion that matches that vibe.

By leveraging the OpenAI API, LoL Recommender is able to parse complex and unstructured input and match it with the best possible fit.

LoL Recommender allows users to:
* Create an account.
* Provide input about their current vibe.
* Get a champion recommendation based on their input.
* Get details about the recommended champion directly from the Riot Games API.
* Access their user profile for the app.
* Modify the name associated with their account.
* Delete their user account.
* Access a record of their recommendations and the prompts associated with them.


## Installation Instructions
1. Fork and clone this repository.
2. Run `npm install` from your terminal while inside of the project's directory.
3. Set up a `.env` file and add `SECRET_SESSION=YOUR_KEY_HERE` and `OPENAI_API_KEY=YOUR_OPENAIAPI_KEY_HERE`
4. Create a `config.json` file inside the `config` folder, add the following template and update it to suit your desired database and credentials:
```
{
  "development": {
    "username": "YourUsername",
    "password": "YourPasswordGoesHere",
    "database": "lolchamps",
    "host": "127.0.0.1",
    "dialect": "postgres" //Adjust if needed
  },
  "test": {
    "username": "YourUsername",
    "password": "YourPasswordGoesHere",
    "database": "lolchamps",
    "host": "127.0.0.1",
    "dialect": "postgres" //Adjust if needed
  },
  "production": {
    "username": "YourUsername",
    "password": "YourPasswordGoesHere",
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres", //Adjust if needed
    "dialectOptions": {
        "ssl": {
          "require": true,
          "rejectUnauthorized": false
        }
    }
  }
}
```
5. Recommended: Do an initial commit and push to your fork. You should have a working server and application at this stage.
6. Run your server and access the app ghrough the port specified in `server.js`.

## Navigating The Project
### Data Models

![ERD](https://github.com/soyrvelez/multiverse-fighter/blob/main/img/docs/game-overview.png?sanitize=true)
