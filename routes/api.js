const express = require('express');
const router = express.Router();
const base = process.env.PWD;
const Users = require(base + '/controllers/users');

//routes go here
//get all users
router.get('/users', Users.getUsers);

//users routes==============================
//Register
router.post('/register', Users.registerUser);

//Authenticate
router.post('/authenticate', Users.authenticateUser);

//getUser`
router.get('/user/:id', Users.getUserByUsername);

//profile
router.get('/profile/:username',Users.getUserByUsername);


module.exports = router;
