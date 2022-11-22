const express = require('express');
const listUsers = express.Router();
const userController = require('../Controller/userController');

listUsers.get('/listPersons', async (req, res, next) => {
  const persons = await userController.getUser(next);
  if (!persons) {
    return res.status(400).json({error: 'No persons found'});
  }
  return res.status(200).json({persons});
}
);

module.exports = listUsers;