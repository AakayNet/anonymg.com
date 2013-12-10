var config = require('../config.js');
var UserModel = require('../models/user.js');
var GoogleStrategy = require('passport-google').Strategy;

module.exports = function (passport) {
  passport.use(new GoogleStrategy({
    realm: 'http://' + config.web.domain + '/',
    returnURL: 'http://' + config.web.domain + '/auth/google/callback'
  }, function (id, profile, done) {
    var userdata = {
      id: id,
      provider: 'google',
      name: profile.displayName,
      email: profile.emails[0].value
    };
    UserModel.update(userdata, function (err, user) {
      done(null, user[0]);
    });
  }));
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });
  passport.deserializeUser(function (id, done) {
    UserModel.find({_id: id}, function (err, user) {
      done(err, user[0]);
    });
  });
};
