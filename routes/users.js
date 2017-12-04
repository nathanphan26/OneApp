const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken');
config = require('../config/database')
const User = require('../models/user');


// Register
router.post('/register', (req, res, next) => {
	let newUser = new User({
		fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	User.addUser(newUser, (err,user) => {
		if(err){
			res.json({success: false, msg: 'Failed to register user'});
		} else{
			res.json({success: true, msg: 'User registered'});
		}
	});
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	User.getUserByUsername(username, (err, user) => {
		if(err) throw err;
		if(!user){
			return res.json({success: false, msg: 'User not found'});
		}

		User.comparePassword(password, user.password, (err, isMatch) => {
			if(err) throw err;
			if(isMatch){
				const token = jwt.sign({
						user: user
					}, config.secret, {
					expiresIn: 604800 // 1 weel
				});

				res.json({
					success: true,
					token: "bearer " + token,
					user: {
						id: user._id,
						fname: user.fname,
						lname: user.lname,
						email: user.email,
						username: user.username
					}
				});
			} else{
				return res.json({success: false, msg: 'Wrong password' });

			}
		});
	});
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	res.json({user: req.user});
});

// router.get("/secretDebug",
//   function(req, res, next){
//     console.log(req.get('Authorization'));
//     next();
//   }, function(req, res){
//     res.json("debugging");
// });


module.exports = router;
