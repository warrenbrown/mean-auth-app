const base = process.env.PWD;
const User = require(base + '/models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');


const registerUser = function(req, res) {
  User.create(req.body, function(err, user) {
    if (err) {
      res.json({ success: false, msg: 'User was not registered!'});
    } else {
      res.json(user);
    }
  });
};

const authenticateUser = function(req, res) {
  res.send('USER AUTHENTICATION');
};

const getProfile = function(req, res) {
  res.send('User Profile');
};

const validateUser = function(req, res) {
  res.send('User Validation');
};

const getUserById = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) return next(err);
    res.json(user);
  });
}

const getUserByUsername = function(req, res) {
  User.findOne({}, 'username', function(err, user) {
    if (err) {
      res.json({ success: false, msg: 'Failed to retreive User!'})
    } else {
        res.json(user);
      }
  });
}

module.exports = {
  registerUser,
  getProfile,
  authenticateUser,
  validateUser,
  getUserById,
  getUserByUsername
}
