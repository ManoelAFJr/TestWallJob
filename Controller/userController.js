const User = require('../Model/userModel');
const passport = require('passport');
const { find } = require('../Model/userModel');

// Path: Controller/userController.js
const registerUser = async (userdata, errorCallBack) => {
  try {
    const user = await User.findOne({email: userdata.email});
    if (user) {
      return false;
    }
      const newUser = new User({
        ...userdata,
      });
      await newUser.save();
      return newUser;
  } catch (error) {
    errorCallBack(error);
  }
};

// Path: Controller/userController.js
const getUser = async (id, errorCallBack) => {
  try {
    const users = await User
    .find().sort({ createdAt: "descending" });
    return users;
  } catch (error) {
    errorCallBack(error);
  }
};

module.exports = {
  registerUser,
  getUser,
};