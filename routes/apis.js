const express = require('express');
const router = express.Router();
const Twitter = require('twitter');

var client = new Twitter({
  consumer_key: 'syNTvTmQC6tnWnUnvY5NDNDPS',
  consumer_secret: 'twBTVDXD2JicUMSbnjPlrblC53TZCmRO9Iyuo5izQ4vsL7HmwQ',
  access_token_key: '916925589855932416-Trr3uaq8ZxuhjdQL5VeJZhhwAi7pDFc',
  access_token_secret: 'bWib1xhYZIC197AFPg8sqCgSM7iyWCV3aKjkIX27SaoE3'
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
	    	timeline["tweet" + key] = tweets[key].text;
	    }
	    res.json({success: true, msg: timeline});
	  }else{
	  		res.json({success: false, msg: 'Failed API call'});
		}
	});
});

module.exports = router;