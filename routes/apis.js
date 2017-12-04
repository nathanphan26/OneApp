// Required packages through npm
const express = require('express');
const router = express.Router();
const Twitter = require('twitter');
var sourceFile = require('../app.js');

// Grabs user input for screen_name and returns list of tweets.
router.post('/timeline', (req, res, next) => {

	// Twitter middleware with access tokens grabbed by twitter login
	var client = new Twitter({
	  consumer_key: 'a2Nhh9MqEfoqbF7wvPOvsJVlt',
	  consumer_secret: 'EI6xwpSrNJQbB0o090iBP6hiaBtdAiqITx6PLYXGU5lifCGmwU',
	  access_token_key: sourceFile.token,
	  access_token_secret: sourceFile.tokenSecret
	});

	// Grabs user inputted screenname
	let params = {screen_name: req.body.screenname};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	// Store users in array
	    var timeline = [];

	    for (var key in tweets) {
	    	// Parses date the tweet was created
	    	let date = tweets[key].created_at;
	    	let [a, b, c, ...d] = date.split(" ");
	    	var created_at = a + " " + b + " " + c;

	    	// Stores Tweet information in an Object
	    	let newTweet = {
	    		tweet: tweets[key].text,
	    		screen_name: tweets[key].user.screen_name,
	    		created_at: created_at
	    	}
	    	timeline.push(newTweet);
	    }
	    
	    res.json({success: true, msg: timeline});
	  } else {
	  		res.json({success: false, msg: 'Failed API call'});
		}
	});
});

router.post('/home_timeline', (req, res, next) => {
	var client = new Twitter({
	  consumer_key: 'a2Nhh9MqEfoqbF7wvPOvsJVlt',
	  consumer_secret: 'EI6xwpSrNJQbB0o090iBP6hiaBtdAiqITx6PLYXGU5lifCGmwU',
	  access_token_key: sourceFile.token,
	  access_token_secret: sourceFile.tokenSecret
	});
	let params = {screen_name: req.body.screenname};
	client.get('statuses/home_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    var timeline = [];
	    for (var key in tweets) {
	    	let date = tweets[key].created_at;
	    	let [a, b, c, ...d] = date.split(" ");
	    	var created_at = a + " " + b + " " + c;
	    	let newTweet = {
	    		tweet: tweets[key].text,
	    		screen_name: tweets[key].user.screen_name,
	    		created_at: created_at
	    	}
	    	timeline.push(newTweet);
	    }
	    res.json({success: true, msg: timeline});
	  }else {
	  		res.json({success: false, msg: 'Failed API call'});
		}
	});
});

module.exports = router;
