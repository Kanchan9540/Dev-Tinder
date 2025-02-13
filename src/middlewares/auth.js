const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { request } = require("express");

//***********Authentication****************
const UserAuth = async (req, res, next) => { 
 //Read the token from the req cookies
 //validate the user
 //find the user

 try{
    const {token} = req.cookies;
    if(!token){
        throw new Error("Token is not valid !!!!!!!!!!!!");
    }
    const decodeObj = await jwt.verify(token, "dev@Tinder95");

    const {_id} = decodeObj;

    const user = await User.findById(_id);
    if(!user) {
        throw new Error("User not found");
    }

    req.user = user;
    next();
 }
 catch (err) {
   res.status(400).send("ERROR: "+ err.message);
 }
};

//exports
module.exports = {
    UserAuth,
};