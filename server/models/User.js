const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
  },
  bio: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ // At least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number
  }
});



/// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  try {
    console.log('pre save hook called');
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    console.log('password hashed:', hash);
    this.password = hash;
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (password) {
  console.log('comparePassword called');
  const match = await bcrypt.compare(password, this.password);
  console.log('match:', match);
  return match;
};


const User = mongoose.model('User', userSchema);


module.exports = User;
