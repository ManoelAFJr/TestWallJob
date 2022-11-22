const bcrypt = require('bcryptjs');
const mongoose = require('../Database/data');

const UserSchema = mongoose.Schema({
  name: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
  },
  email: {type:String, required: true, unique: true},
  password: {type: String, required: true}, 
  createdAt: {type: Date, default: Date.now}
});

UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.checkPassword = function(passwordAttempt, callback) {
  bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
    callback(err, isMatch);
  });
};

const User = mongoose.model('Persons', UserSchema);
module.exports = User;