const { json } = require("express");
const express = require("express");
const passport = require("passport");
const routerLogin = express.Router();


routerLogin.post(
  "/login", async (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json(info.json);
      }
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        return res.status(200).json({user:{name: user.name}});
      });
    })(req, res, next);
  }
);


module.exports = routerLogin;
