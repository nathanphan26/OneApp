const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const Twitter = require('twitter'); //cs115julig
const TwitterToken = require('passport-twitter-token');

mongoose.connect(config.url);

mongoose.connection.on('connected', () => {
	console.log('Connected to database ' + config.url);
});

mongoose.connection.on('error', (err) => {
	console.log('Database error: ' + err);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = 8000

// Twitter Middleware
var TwitterTokenStrategy = require('passport-twitter-token');
passport.use(new TwitterTokenStrategy({
    consumerKey: 'a2Nhh9MqEfoqbF7wvPOvsJVlt',
    consumerSecret: 'EI6xwpSrNJQbB0o090iBP6hiaBtdAiqITx6PLYXGU5lifCGmwU'
  }, function(token, tokenSecret, profile, done) {
    User.findOrCreate({ twitterId: profile.id }, function (error, user) {
      return done(error, user);
    });
  }
));

app.post('/auth/twitter/token',
  passport.authenticate('twitter-token'),
  function (req, res) {
    // do something with req.user
    res.send(req.user ? 200 : 401);
		console.log("It works bro!" + req.user);
  }
);


// CORS Middleware
app.use(cors());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
	res.send('Invalid endpoint');
});

app.get('*', (req, res) => {
	res.sendFile(path,join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
	console.log('Server started on port '+ port);
});
