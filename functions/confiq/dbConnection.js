const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://dheerajtechbuddiesit:dheeraj12345@cluster0.ti9yo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{useNewUrlParser:true,  useUnifiedTopology:true, }).then((res)=>{
            console.log('data base connected ',res);
        },error=>{
            console.log('database connection error',error);
        }); 
        // console.log("MongoDB connected :", conn.connection.host, conn.connection.name);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};
module.exports = connectDB;