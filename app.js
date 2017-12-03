// Required packages through npm
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const routes = require('./routes/users');
const Strategy = require('passport-twitter').Strategy;
const session = require('express-session');
const app = express();
const request = require('request');

// Database setup
mongoose.connect(config.url);
mongoose.connection.on('connected', () => {
	console.log('Connected to database ' + config.url);
});

mongoose.connection.on('error', (err) => {
	console.log('Database error: ' + err);
});

// Routes
const users = require('./routes/users');
const apis = require('./routes/apis');

// Port Number
const port = 8000

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

// Routes
app.use('/users', users);
app.use('/apis', apis);

// Index Route
app.get('/', (req, res) => {
	res.send('Invalid endpoint');
});

//app.get('*', (req, res) => {
	//res.sendFile(path,join(__dirname, 'public/index.html'));
//});

// Start Server
app.listen(port, () => {
	console.log('Server started on port '+ port);
});



//BEGIN TWITTER AUTHENTICATION
passport.use(new Strategy({
	consumerKey: 'a2Nhh9MqEfoqbF7wvPOvsJVlt',
	consumerSecret: 'EI6xwpSrNJQbB0o090iBP6hiaBtdAiqITx6PLYXGU5lifCGmwU',
	callbackURL: 'http://localhost:8000/twitter/callback'
}, function(token, tokenSecret, profile, callback){
	// console.log(token);
	// console.log(tokenSecret);
	// console.log(profile);
	// console.log(callback);
	module.exports.token = token;
	module.exports.tokenSecret = tokenSecret;
	return callback(null, profile);
}));

//Serializing keeps the user login token throughout the pages
passport.serializeUser(function(user, callback){
	callback(null, user);
})

passport.deserializeUser(function(user, callback){
	callback(null, obj);
})

app.use(session(
	{secret: 'whatever',
	 resave: true,
 	 saveUninitialized: true}
))

app.get('/profile', function(req, res) {
		res.render('/', {twitUser: req.user})
})

app.get('/twitter/login', passport.authenticate('twitter'))
app.get('/twitter/callback', passport.authenticate('twitter', {
	failureRedirect: 'http://yahoo.com'
}), function(req, res) {
	res.redirect('/')
})

//END TWITTER AUTHENTICATION
