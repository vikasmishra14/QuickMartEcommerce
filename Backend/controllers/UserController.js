
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');

// @route POST /api/users
const SignUp = asyncHandler(async (req, res) => {
  try {
    const { email, password, name, phone } = req.body;
    const user = await User.create({ name, email, password, phone });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }); // Find user by email
    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({
        email: user.email, id: user
          ._id
      }, "SECRET", { expiresIn: '1 hour' });
      return res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000,
        sameSite: 'lax'
      }).status(200).json({ user });;
      //  const userWithoutPassword = { ...user.toObject(), password: undefined };

    } else {
      res.status(400).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const DeleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const UpdateUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { SignUp, SignIn, DeleteUser, UpdateUser };
