const mongoose = require('mongoose');   

const contactScema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name : {
        type : String,
        required : [true, "Name is required"]
    },
    mobile : {
        type : String,
        required : [true, "Mobile number is required"]
    },
},{
    timestamps : true
});

module.exports = mongoose.model("Contact", contactScema);
