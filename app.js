const express = require('express');
// const bodyParser = require('body-parser');
// const passport = require('passport');
const setUpPassport = require('./config');


const register = require('./Routers/register');
const login = require('./Routers/login');
// const { use } = require('passport');

const app = express();
app.use(express.json());

setUpPassport();

// app.use(passport.initialize());
// app.use(passport.session());

app.use( register );
app.use( login );

module.exports.app = app;