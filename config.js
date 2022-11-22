const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("./Model/userModel");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use("login", new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ email: email });
          if (!user) {
            return done(null, false, {json: {error: "User not found"}});
          }
          const validate = await user.checkPassword(password, (err, isMatch) => {
            if(err){
              return done(err);
            }
            if(isMatch){
              return done(null, user);
            }
            return done(null, false, {json: {error: "Invalid password"}});
          });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};