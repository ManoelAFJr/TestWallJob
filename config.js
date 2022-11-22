const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./Model/userModel');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  
  passport.use('local', new LocalStrategy((email, password, done) => {
    User.findOne({email}, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, {message: 'Incorrect email.'});
      user.checkPassword(password, (err, isMatch) => {
        if (err) return done(err);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Incorrect password.'});
        }
      });
    });
  }));
};

