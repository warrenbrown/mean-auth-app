const express = require('express');
const router = express.Router();
const base = process.env.PWD;
const Users = require(base + '/controllers/users');

//routes go here

//users routes==============================
//Register
router.post('/register', Users.registerUser);

//Authenticate
router.post('/authenticate', Users.authenticateUser);

//profile
router.get('/profile/:username',Users.getUserByUsername);


module.exports = router;
