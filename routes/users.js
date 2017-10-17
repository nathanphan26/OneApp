const express = require('express');
const router = express.Router();

// Register
router.get('/register', (req, res, next) => {
	res.send('REGISTER');
}); 

// Register
router.post('/authenticate', (req, res, next) => {
	res.send('authenticate');
}); 

// Register
router.get('/profile', (req, res, next) => {
	res.send('profile');
}); 

// Register
router.get('/validate', (req, res, next) => {
	res.send('VALIDATE');
}); 

module.exports = router;