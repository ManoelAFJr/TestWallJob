const User = require('../Model/userModel');
const { json } = require("body-parser");
const { error } = require("express-openapi-validator");


const apiRegisterUser = async (req, res, next) => {
  const {name, email, password} = req.body;
  const user = 
  await RegisterUser({name, email, password}, next);
  if (!user) {
    return res.status(400).json({error: 'User already exists'});
  }
  return res.status(200).json({user});
};


const RegisterUser = async (userdata, errorCallBack) => {
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


const apiDelete =  (req, res, next) =>{
  const email = req.params.email;
  User.deleteOne({ email : email}, (err, user)=>{
    if(err){
      return next(err);
    } 
    if(!user){
      return next(404);
    }
    res.status(200).json('User deleted');
  });
}

module.exports = {
  apiRegisterUser,
  apiDelete,
};