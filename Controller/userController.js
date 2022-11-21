const User = require('../Model/user');

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
const loginUser = async (userdata, errorCallBack) => {
  try {
    const user = await User
      .findOne
      ({email: userdata.email});
    if (!user) {
      return false;
    }
    const isMatch = await user.checkPassword(userdata.password);
    if (!isMatch) {
      return false;
    }
    return user;  
  } catch (error) {
    errorCallBack(error);
  }
};

// Path: Controller/userController.js
const getUser = async (id, errorCallBack) => {
  try {
    const user = await User
      .findById(id) 
      .select('-password');
    return user;
  } catch (error) {
    errorCallBack(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};