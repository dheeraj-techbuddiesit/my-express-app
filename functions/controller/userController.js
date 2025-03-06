const asyncHandler = require("async-error-handler");
const user = require("../models/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(500).json({ message: "All field required" });
  }
  const userExist = await user.findOne({ email });
  if (userExist) {
    return res.status(500).json({ message: "User already exist" });
  }
  const newUser = new user({
    username,
    email,
    password,
  });
  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(password, salt);
  await newUser.save();
  res.status(200).json({ message: "User register successfull" });
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({ message: "All field required" });
  }
  const userExist = await user.findOne({ email });
  if (!userExist) {
    return res.status(500).json({ message: "User not exist" });
  }
  const isMatch = await bcrypt.compare(password, userExist.password);
  if (!isMatch) {
    return res.status(500).json({ message: "Email or password Invalid" });
  }
  const accessToken = jwt.sign(
    {
      username: userExist.username,
      email: userExist.email,
      id: userExist.id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1Years" }
  );
  res.status(200).json({token: accessToken});
});

const userData = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { registerUser, userLogin, userData };
