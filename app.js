const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const Twitter = require('twitter'); //cs115julig

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
var client = new Twitter({
  consumer_key: 'syNTvTmQC6tnWnUnvY5NDNDPS',
  consumer_secret: 'twBTVDXD2JicUMSbnjPlrblC53TZCmRO9Iyuo5izQ4vsL7HmwQ',
  access_token_key: '916925589855932416-Trr3uaq8ZxuhjdQL5VeJZhhwAi7pDFc',
  access_token_secret: 'bWib1xhYZIC197AFPg8sqCgSM7iyWCV3aKjkIX27SaoE3'
});
 
var params = {screen_name: 'cs115oneapp'};

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    // console.log(tweets);
    for (var key in tweets) {
    	console.log(tweets[key].text);
    }
  }
});


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