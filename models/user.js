const mongoose = require('mongoose').set('debug', true);
const bcrypt = require('bcrypt-nodejs');
const config = require('../config/database');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String
  },
  username: {
    type: String, required: true, unique: true
  },
  email: {
    type: String, required: true, unique: true
  },
  password: {
    type: String, required: true
   }
});

//Schema middleware to encrypt password
userSchema.pre('save', function(next) {
  if (!this.isModified('password'))
  return next();

//apply encryption
  bcrypt.hash(this.password, null, null, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

// Methods to compare password to encrypted password upon login
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password); // Return comparison of login password to password in database (true or false)
};

module.exports = mongoose.model('User', userSchema)
