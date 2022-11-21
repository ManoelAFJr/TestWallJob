const express = require('express');
const userController = require('../Controller/userController');
const routerRegister = express.Router();

routerRegister.post('/register', async (req, res) => {
  const {name, email, password} = req.body;
  const user = 
  await userController.registerUser({name, email, password}, (error) => {
    res.status(500).json({error});
  });
  if (!user) {
    // req.flash('error', 'User already exists');
    res.status(400).json({error: 'User already'});
  }
  res.status(200).json({user});
});

module.exports = routerRegister;
