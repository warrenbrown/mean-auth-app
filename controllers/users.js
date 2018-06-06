const base = process.env.PWD;
const User = require(base + '/models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');



//get all users
const getUsers = function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      res.json({ success: false, msg: 'Counld not find any users'});
    } else
    console.log(users);

    res.json(users);
  });
}

//Register/Create a user
const registerUser = function(req, res) {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  //save user
  user.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.json(user);
    }
  })
};

//Find User by Id
const getUserById = function(req, res) {
  User.findById(req.params.id, function(err, user) {
    console.log(user);

    if (err) {
      res.json({ success: false, msg: 'Could not find user'});
    } else {
      res.json(200, user);
    }
  });
}

//Find user by username
const getUserByUsername = function(req, res) {
  User.findOne({ username: req.body.username }, 'username', function(err, user) {
    if (err) {
      res.json({ success: false, msg: 'Failed to retreive User!'})
    } else {
        res.json(user);
      }
  });
}

const authenticateUser = function(req, res) {
  res.send('USER AUTHENTICATION');
};

const getProfile = function(req, res) {
  res.send('User Profile');
};

const validateUser = function(req, res) {
  res.send('User Validation');
};


module.exports = {
  registerUser,
  getProfile,
  authenticateUser,
  validateUser,
  getUserById,
  getUserByUsername,
  getUsers
}
