const mongoose = require('mongoose');
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

module.exports = mongoose.model('user', userSchema)
