const express = require('express');
const userController = require('../Controller/userController');
const routerRegister = express.Router();

routerRegister.post('/register', async (req, res, next) => {
  const {name, email, password} = req.body;
  const user = 
  await userController.registerUser({name, email, password}, next);
  if (!user) {
    return res.status(400).json({error: 'User already exists'});
  }
  return res.status(200).json({user});
});


module.exports = routerRegister;
