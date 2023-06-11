const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
 
  bio: {
    type: String,
  },
  avatar:
   {
     type: String 
    },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    match: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/ // At least 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number
  },
  online: {
    type: Boolean,
    default: false,
  },
  points: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ online: true }).select('username');
    console.log('Fetched users:', users); // Add this line to check the fetched users
    const usernames = users.map((user) => user.username);
    console.log('Fetched usernames:', usernames); // Add this line to check the usernames array
    res.json({ users: usernames });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


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