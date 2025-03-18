const express = require('express');
const serverless = require('serverless-http');
const connectDB = require('./confiq/dbConnection');
const app = express();
const router = express.Router();
const cors = require('cors');
const validateToken = require("./middleware/validateToken");
const errorHandler = require('./middleware/errorHandler');
const {
  registerUser,
  userLogin,
  userData,
} = require("./controller/userController");
const {getAllContact,
  getSingleContact,
  createContact,
  updateContact , 
  deleteContact}=require('./controller/contactController');
const port = 3000
app.use(express.json());
app.use(cors());
let records = [];
connectDB();


router.post("/register" ,registerUser);

router.post("/login", userLogin);

router.get("/current",validateToken,userData);

router.get("/",validateToken, getAllContact).post("/",validateToken,createContact);
router.route("/:id").get(getSingleContact).put(updateContact).delete(deleteContact);





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.use(errorHandler);
app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);
