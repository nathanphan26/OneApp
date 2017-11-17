const express = require('express');
const router = express.Router();
const Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'a2Nhh9MqEfoqbF7wvPOvsJVlt',
  consumer_secret: 'EI6xwpSrNJQbB0o090iBP6hiaBtdAiqITx6PLYXGU5lifCGmwU',
  access_token_key: '931617198866444288-xZ94xupUldyuvTZUshHaxlFrk9mWHbP',
  access_token_secret: '0DuUv94HhZJrXF484GQXpKjWMFZ6AttMYJQw5o1FmmdI7'
});

router.post('/timeline', (req, res, next) => {
	let params = {screen_name: req.body.screenname};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    // console.log(tweets);
	    // var str = "";
	    var timeline = {};
	    for (var key in tweets) {
	    	// console.log(tweets[key].text);
	    	// str = str.concat(tweets[key].text);
	    	// console.log(str);
	    	let newTweet = {
	    		tweet: tweets[key].text
	    	}
	    	timeline["tweet" + key] = newTweet;
	    }
	    res.json({success: true, msg: timeline});
	  }else{
	  		res.json({success: false, msg: 'Failed API call'});
		}
	});
});

module.exports = router;

// let newTweet = {
// 	    		tweet: tweets[key].text;
// 	    	}
// timeline["tweet" + key] = newTweet;