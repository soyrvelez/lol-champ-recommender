require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const methodOverride = require('method-override');
const db = require('./models');

// environment variables
SECRET_SESSION = process.env.SECRET_SESSION;

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);
app.use(methodOverride('_method'));

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
app.use('/recommendation', isLoggedIn, require('./controllers/recommendation'));

// Add this below /auth controllers
app.get('/profile', isLoggedIn, async (req, res) => {
  try {
    const { id, name, email } = req.user.get();
    const userRecommendations = await db.recommendation.findAll({
      where: {
        userId: id
      }
    });
    res.render('profile', { id, name, email, userRecommendations });
  } catch (error) {
    console.log('Error >>>', error);
    res.status(500).send('Error occurred');
  }
});

app.get('/:userid/delete', (req, res) => {
    const { userid } = req.params;
    return res.render('delete-confirmation.ejs', { userid });
});

app.get('/:userid/edit', async (req, res) => {
  try {
    const { userid } = req.params;
    const foundUser = await db.user.findOne({
      where: { id: userid }
    });
    const name = foundUser.name;
    console.log('found user', foundUser);
    return res.render('edit.ejs', { userid, name });
  } catch (error) {
    console.log('Could not find user >>>', error);
  }
})

app.delete('/user/:userid', async (req, res) => {
  try {
    const { userid } = req.params;
    let numOfRowsDeleted = await db.user.destroy({
      where: { id: userid }
    });
    return req.logOut(function(err, next) {
      if (err) {
        return next(err);
      }
      req.flash('success', 'Logging out... See you next time!');
      res.redirect('/');
    });
/*     console.log('number of rows deleted >>>', numOfRowsDeleted);
    return res.redirect('/'); */
  } catch (error) {
    console.log('did not delete user because of >>>', error);
  }
});

app.put('/:userid', async (req, res) => {
  try {
    const newName = req.body.name;
    const numRowsUpdated = await db.user.update({
      name: newName,
    }, {
      where: {
        id: req.params.userid
      }
    });
    console.log('number of users updated', numRowsUpdated);
    return res.redirect('/profile');
  } catch (error) {
    console.log('did not update user because of >>>', error);
  }
});

//Last Routes
app.use((req, res, next) => {
  res.status(404).render('404');
});

/* app.get('/404', (req, res) => {
  res.send('404 Not Found').render('404');
}); */


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🎧 You're listening to the smooth sounds of port ${PORT} 🎧`);
});

module.exports = server;
