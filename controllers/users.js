const base = process.env.PWD;
const User = require(base + '/models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require(base + '/config/database');



//get all users
const getUsers = function(req, res) {
  User.find({}, (err, users) => {
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
  });
};

//Find User by Id
const getUserById = function(req, res) {
  User.findById(req.params._id, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'User was not found' });
    } else {
      res.json({success: true, msg: 'User was succesfully found', user});
    }
  });
};

//Find by username

const getUserByUsername = function(req, res) {
  User.findOne({ username: req.params.username }, (err, user) => {
    //check if error was found
    if (err) {
      res.json({ success: false, msg: err});
    } else {
      //check if user was found
      if (!user) {
        res.json({success: false, msg: 'Username not found'});
      } else {
        res.json({ success: true, msg: 'User found successfully'})
      }
    }
  });
}

//Authenticate

 const authenticateUser = function(req, res) {
   User.findOne({ username: req.body.username }, (err, user) => {
     console.log(user);
     if (err) {
       res.send(err);
     } else {
       //check if username was found
       if (!user) {
         res.json({success: false, msg: 'User not found!'});
       } else {
         console.log(req.body.password);
         //check if passwords match
         const validPassword = user.comparePassword(req.body.password);

          // Compare password provided to password in database is a match
          if (!validPassword) {
            res.json({ success: false, msg: 'invalid passwor'});
          } else {
            const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); // Create a token for client
            res.json({ success: true, msg: 'Logged', token: token, user: { username: user.username }});
          }

       }
     }
   })
};

const getProfile = function(req, res) {
  res.json({ user: req.user });
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
