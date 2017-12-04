// Required packages through npm
const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken');
config = require('../config/database')
const User = require('../models/user');

// Register post method
router.post('/register', (req, res, next) => {
	let newUser = new User({
		fname: req.body.fname,
		lname: req.body.lname,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	// Adds user to database through user model
	User.addUser(newUser, (err,user) => {
		if(err) {
			res.json({success: false, msg: 'Failed to register user'});
		} else {
			res.json({success: true, msg: 'User registered'});
		}
	});
});

/* 
 * Authenticate method.
 * Compares username and password with 
 * users in the database. Retruns token
 */
router.post('/authenticate', (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	// Grabs username
	User.getUserByUsername(username, (err, user) => {
		if(err) throw err;
		if(!user) {
			return res.json({success: false, msg: 'User not found'});
		}

		// Compares password with given username
		User.comparePassword(password, user.password, (err, isMatch) => {
			if(err) throw err;
			if(isMatch) {
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
			} else {
				return res.json({success: false, msg: 'Wrong password' });
			}
		});
	});
});

// Profile method, returns the user logged in
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
	res.json({user: req.user});
});

module.exports = router;
