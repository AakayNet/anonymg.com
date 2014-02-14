var config = require('../config.js');
var UserModel = require('../models/user.js');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (passport) {
  passport.use(new FacebookStrategy({
    clientID: config.auth.facebook.key,
    clientSecret: config.auth.facebook.secret,
    callbackURL: 'http://' + config.web.domain + '/auth/facebook/callback'
  }, function (accessToken, refreshToken, profile, done) {
    var userdata = {
      id: profile.id,
      provider: 'facebook',
      name: profile.displayName
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
