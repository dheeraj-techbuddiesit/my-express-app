const jwt = require("jsonwebtoken");
const asyncHandler = require("async-error-handler");

const validateToken = asyncHandler(async (req,res,next)=>{
    const token = req.headers.authorization;
    if(token){
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
            if(err){
                return res.status(403).json("Unauthorized");
            };
        console.log("User is verified", user);
        req.user = user;
        next();
        });
    }   
});
module.exports = validateToken;