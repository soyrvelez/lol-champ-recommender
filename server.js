require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const db = require('./models');

// environment variables
SECRET_SESSION = process.env.SECRET_SESSION;

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(flash());            // flash middleware

app.use(session({
  secret: SECRET_SESSION,    // What we actually will be giving the user on our site as a session cookie
  resave: false,             // Save the session even if it's modified, make this false
  saveUninitialized: true    // If we have a new session, we save it, therefore making that true
}));

// add passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(res.locals);
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', isLoggedIn, (req, res) => {
  res.render('index');
})

app.use('/auth', require('./controllers/auth'));
app.use('/recommendation', require('./controllers/recommendation'));

// Add this below /auth controllers
app.get('/profile', isLoggedIn, (req, res) => {
  const { id, name, email } = req.user.get();
  res.render('profile', { id, name, email });
});

app.delete('/:userid', async (req, res) => {
  try {
    let numOfRowsDeleted = await db.user.destroy({
      where: { id: 7 }
    });
    console.log('number of rows deleted >>>', numOfRowsDeleted);
  } catch (error) {
    console.log('did not delete user because of >>>', error);
  }
});

app.put('/:userid', async (req, res) => {
  try {
    const numRowsUpdated = await db.user.update({
      name: 'Updated Name'
    }, {
      where: {
        id: req.params.userid
      }
    });
    console.log('number of users updated', numRowsUpdated);
  } catch (error) {
    console.log('did not update user because of >>>', error);
  }
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
