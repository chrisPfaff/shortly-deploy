var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var users = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

var User = db.model('User', users);

users.pre('save', function(next) {//Look into Mongoose model.pre
  var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.password, null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
        next();
    });
});

User.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      if (err) {
        callback(err);
      } else {
        callback(null, isMatch);
      }
  });
}

module.exports = User;
