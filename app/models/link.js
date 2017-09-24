var db = require('../config');
var crypto = require('crypto');

var mongoose = require('mongoose');

var urls = mongoose.Schema({

  visits: Number,
  url: String,
  baseUrl: String,
  code: String,
  title: String,

});

var Link = db.model('Link', urls);

var createSha = function(url) {

}

urls.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});




module.exports = Link;
