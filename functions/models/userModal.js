const mongoose = require('mongoose');


const userSchema =new mongoose.Schema({
    username : {
        type: String,
        required:[true,"Please add username"],
    },
    email : {
        type:String,
        required : [true, "Please add user email "],
        unique : [true, "Email already exist"]
    },
    password:{
        type:String,
        required:[true,"please provide password"]
    }
} ,{timestamps : true});
  module.exports = mongoose.model("user",userSchema);