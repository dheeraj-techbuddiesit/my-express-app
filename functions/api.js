const express = require('express');
const serverless = require("serverless-http");
const errorHandler = require('./middleware/errorHandler');
const app =express();
const connectDB = require('./confiq/dbConnection');
const dotenv = require('dotenv').config();
const port = "5000";
const router = express.Router();
app.use(express.json());
connectDB();
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/user', require('./routes/userRouter'));
app.use('/test',function(req,res){res.send('Server code working fine')});
app.use(errorHandler);
app.listen(port, ()=>{
    console.log("Server is running on port", port );
});
app.use('/functions', router);
module.exports.handler = serverless(app);