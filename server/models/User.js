import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

const findOne = async (conditions) => {
  try {
    const user = await User.findOne(conditions);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error('An error occurred while finding the user.');
  }
};

export { User, findOne };
