# Project 2 Planning

## Part 1

Review the Project 2 requirements and check out some [examples](https://romebell.gitbook.io/sei-802/projects/past-projects/project2).

In this space below, list **THREE** ideas for your Project 2. For each idea, include [user stories](https://www.atlassian.com/agile/project-management/user-stories) for each idea and a link to the API(s) you want to use for it.

--------------------------------------------------------
1. Mood based Spotify Playlist Generator - Spotify / OpenAI
2. Mood based League of Legends Champion Recommendation Engine - League Of Legends / OpenAI
3. Personal Pokedex - Pokemon
---------------------------------------------------------

Make a PR when you're done!

---

## Part 2

In the space below:
* either embed or link a completed ERD for your approved P2 idea
* if there are any changes/additions to your user stories, place your full set of revised user stories here
* either embed or link wireframes for every page of your app

----------------------------------------------------------
### ERD
![ERD](https://github.com/soyrvelez/lol-champ-recommender/blob/main/resources/lol-recommender-erd.png?sanitize=true)
----------------------------------------------------------
### User Stories
- As a user I am able to sign up for an account so I can receive personalized content in the app.
- As a user I am able to attempt to login to an account so I can access private app features.
- As a user if I provide incorrect login credentials I want to be notified so I can create an account.
- As a user I want to provide input describing my mood and submit the input to the app
- As a user I want to receive a personalized champion recommendation with useful information about the champion to enhance my playing experience
- As a user I want to be able to reference all the previous recommendations I have received from the app
- As a user I want to know why I am unable to access routes or when those routes don’t exist
As a user I want to be able to edit my profile in the app

----------------------------------------------------------
### Wireframes

#### App Page
![App Wireframe](https://github.com/soyrvelez/lol-champ-recommender/blob/main/resources/main-app.png?sanitize=true)

#### Recommendation
![App Wireframe](https://github.com/soyrvelez/lol-champ-recommender/blob/main/resources/recommendation-wireframe.png?sanitize=true)

#### Profile
![User Profile Wireframe](https://github.com/soyrvelez/lol-champ-recommender/blob/main/resources/profile-wireframe.png?sanitize=true)

----------------------------------------------------------

Make a PR when you're done!


## Requirements Inside `Project Board`

`card` FUNDAMENTALS
```
### FUNDAMENTALS
- [ ] Deployed (e.g. Heroku)
- [x] Site has basic functionality related to its goal
- [x] At least 2 GET routes (other than auth)
- [x] At least 1 POST route
- [x] At least 1 DELETE route
- [x] At least 1 PUT route
```

`card` SUFFICIENT DIFFICULTY
```
### SUFFICIENT DIFFICULTY: At least 1 of the following:
- [x] Use of an API
- [x] Advanced Database Relationships
- [ ] Sockets
- [ ] Scraping
- [ ] OAuth
- [ ] Other
```

`card` AUTH/SECURITY
```
### AUTH/SECURITY (Mostly From Template Boilerplate)
- [x] Log in works (required: boilerplate or better)
- [x] Sensible error messages for bad login info  (boilerplate or better)
- [x] Passwords hashed in database
- [x] Passwords in form are input type="password" (dots)
- [x] Password verification is checked
- [ ] Can't sneak edit/delete data that I don't own by typing in random ids
```
`card` GITHUB USAGE
```
### GITHUB USAGE
- [x] Appropriate Use of Github
- [x] `README` is included and is descriptive
- [x] `.gitignore` properly set up
- [x] No API keys in Github code (used a .env file)
- [x] Multiple commits per day
- [x] Repo up on day 1 of project week or sooner
- [x] `README` has *Installation Instructions*
```

`card` DATABASE USAGE
```
### DATABASE USAGE
- [x] At least 2 Models other than join tables (required)
- [x] Relationships were set up appropriately between models
- [x] Avoided global variables, storing data in files, etc
- [x] No raw file/image data stored in database, etc
```

`card` CODE STYLE
```
### CODE STYLE
- [x] Generally DRY code / No enormous files
- [x] Proper indentation (or mostly pretty good!)
- [x] Naming conventions kept
- [x] No glaring logic errors
```
`card` USER EXPERIENCE
```
### USER EXPERIENCE
- [x] Effort was put into design
- [x] No broken links (server errors or 404s)
- [x] Typing a purposely bad link renders an error ejs page
- [x] Content is responsive to screen size changes
- [x] No glaring alignment or grid errors
```
