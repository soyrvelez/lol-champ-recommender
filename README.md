# `LoL Recommender`
AI powered vibe-based League of Legends Champion recommendation engine.

![LoL Recommender](https://github.com/soyrvelez/lol-champ-recommender/blob/main/resources/lolrecommender.png?sanitize=true)

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
5. Run `sequelize db:create` from your terminal or manually create the required database in your server.
6. Run `sequelize db:migrate` from your terminal to update your database's schema to the project's specifications.
7. Recommended: Do an initial commit and push to your fork.
8. Run your server and access the app through the port specified in `server.js`.

## Navigating The Project
### Data Models
#### Entity Relationship Diagram
![ERD](https://github.com/soyrvelez/lol-champ-recommender/blob/main/resources/lol-recommender-erd.png?sanitize=true)

#### User Model
- **Description:** This model is used to store user information.
- **Attributes:**
  - **id:** Automatically generated by the ORM.
  - **name:** The user's actual name ie., Johnny Appleseed
  - **email:** User's email.
  - **password:** User's password
  - **createdAt:** Automatically generated by the ORM.
  - **updatedAt:** Automatically generated by the ORM.

#### Recommendation Model
- **Description:** This model is used to store generated recommendations.
- **Attributes:**
  - **id:** Automatically generated by the ORM.
  - **userId:** id corresponding to an id in the user's table. This tracks which user generated a recommendation.
  - **prompt:** Input provided to the app to generate each recommendation.
  - **recommendedChampion:** User's password
  - **createdAt:** Automatically generated by the ORM.
  - **updatedAt:** Automatically generated by the ORM.

### Views

#### Login
![Login Page](https://github.com/soyrvelez/lol-champ-recommender/blob/main/resources/login-page.png?sanitize=true)

The app's user journey begins in a login page where returning users can login or for new users to head to our signup.

#### Signup
![Signup Page](https://github.com/soyrvelez/lol-champ-recommender/blob/main/resources/signup.png?sanitize=true)

The signup page captures a user's information before creating an account for them. Once the user submits the signup form, the following validations occur:
- App checks to see if there are other users using the same email before creating the account.
- Password is encrypted before it's stored in the database.

#### Profile
![User Profile Page](https://github.com/soyrvelez/lol-champ-recommender/blob/main/resources/profile.png?sanitize=true)

This page displays each user's information, provides them with the tools to edit or delete their account and displays all of the recommendations they have generated and their associated information.

#### App
![App Page](https://github.com/soyrvelez/lol-champ-recommender/blob/main/resources/app.png?sanitize=true)

In the main page of the app, user's get instructions on how to generate a recommendation and a simple text input where they can share information about their current vibe and ask the app to provide a champion recommendation for them.

#### Recommendation
![Recommendation Detail Page](https://github.com/soyrvelez/lol-champ-recommender/blob/main/resources/recommendation.png?sanitize=true)

After a succesful call to the OpenAI API, this recommendation is rendered pulling media and information from the League of Legends Dragon Data API to provide more information about the recommended champion.
