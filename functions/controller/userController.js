const asyncHandler = require("async-error-handler");
const user = require("../models/userModal");
const bcrypt = require("bcryptjs");
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
  const salt = await bcrypt.genSaltSync(10);
  newUser.password = await bcrypt.hashSync(password, salt);
  await newUser.save();
  res.status(200).json({ message: "User register successfull" });
});

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({ message: "All field required" });
  }
  const userExist = await user.findOne({ email });
  if (!userExist) {
    return res.status(500).json({ message: "User not exist" });
  }
  const isMatch = await bcrypt.compareSync(password, userExist.password);
  if (!isMatch) {
    return res.status(500).json({ message: "Email or password Invalid" });
  }
  const accessToken = jwt.sign(
    {
      username: userExist.username,
      email: userExist.email,
      id: userExist.id,
    },
    "mycontact1234",
    { expiresIn: "1Years" }
  );
  res.status(200).json({token: accessToken});
};

const userData = asyncHandler(async (req, res) => {
  const userExist = await user.findById(req.user.id);
  if(!userExist){
     res.status(404).json({message:"User not found"});
  }else {
    const userData = {
      Name : userExist.username,
      Email : userExist.email
    }
     res.status(200).json({data:userData});
  } 
});

module.exports = { registerUser, userLogin, userData };
