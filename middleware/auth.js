const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require('../models/User');
module.exports = async function(req, res, next){
    //Get token from header
    const token = req.header("x-auth-token");
    //Check if no token
    if(!token){
        return res.status(401).json({msg: "No token, authorization denied"});
    }
    //Verify token
    try{
        //decode the token
        const decoded = jwt.verify(token, keys.JWT_SECRET);
        const user = await User.findById(decoded._id);
        //set req.user
        req.user = {id: decoded._id, name: user.name, email: user.email};
        next();
    }catch(err){
        res.status(401).json({msg: "Token is not valid"});
    }
};