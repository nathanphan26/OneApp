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
const qs = require('querystring');
const exphbs = require('express-handlebars');
// const Twitter = require('twitter'); //cs115juli
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
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
var requestTokenUrl = "https://api.twitter.com/oauth/request_token";
var CONSUMER_KEY = "a2Nhh9MqEfoqbF7wvPOvsJVlt";
var CONSUMER_SECRET = "EI6xwpSrNJQbB0o090iBP6hiaBtdAiqITx6PLYXGU5lifCGmwU";

var oauth = {
  callback : "http://localhost:3000/signin-with-twitter",
  consumer_key  : CONSUMER_KEY,
  consumer_secret : CONSUMER_SECRET
}
var oauthToken = "";
var oauthTokenSecret = "";
app.get('/', function (req, res) {
  //Step-1 Obtaining a request token
  request.post({url : requestTokenUrl, oauth : oauth}, function (e, r, body){

    //Parsing the Query String containing the oauth_token and oauth_secret.
    var reqData = qs.parse(body);
    oauthToken = reqData.oauth_token;
    oauthTokenSecret = reqData.oauth_token_secret;

    //Step-2 Redirecting the user by creating a link
    //and allowing the user to click the link
    var uri = 'https://api.twitter.com/oauth/authenticate'
    + '?' + qs.stringify({oauth_token: oauthToken})
     res.render('test', {url : uri});
  });
});



//END TWITTER AUTHENTICATION
