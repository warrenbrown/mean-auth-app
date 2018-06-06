const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const base = process.env.PWD;
const Users = require(base + '/controllers/users');
const User = require(base + '/models/user');

//routes go here
//get all users
router.get('/users', Users.getUsers);

//users routes==============================
//Register
router.post('/register', Users.registerUser);

//Authenticate
router.post('/login', Users.authenticateUser);

//getUser`
router.get('/user/:id', Users.getUserById);

//profile
router.get('/profile/:username', passport.authenticate ('jwt', { session: false }), (res, req) => {
  User.findById(req.params._id, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'User was not found' });
    } else {
      res.json({success: true, msg: 'User was succesfully found', user});
    }
  });
});


module.exports = router;
