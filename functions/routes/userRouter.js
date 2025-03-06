const express = require("express");
const router = express.Router();
const {
  registerUser,
  userLogin,
  userData,
} = require("../controller/userController");
const validateToken = require("../middleware/validateToken");

router.post("/register" ,registerUser);

router.post("/login", userLogin);

router.get("/current",validateToken,userData);

module.exports = router;
