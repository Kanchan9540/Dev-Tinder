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
        return res.status(401).send("Please Login!");
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

// const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// //*********** Authentication Middleware ****************
// const UserAuth = async (req, res, next) => { 
//     try {
//         // Read the token from cookies
//         const { token } = req.cookies;

//         if (!token) {
//             return res.status(401).json({ error: "Please login!" });
//         }

//         // Verify token
//         const decoded = jwt.verify(token, "dev@Tinder95");

//         // Find user by ID
//         const user = await User.findById(decoded._id);

//         if (!user) {
//             return res.status(401).json({ error: "Unauthorized. User not found" });
//         }

//         req.user = user;  // ✅ Assign the user after all checks
//         console.log("🛂 Authenticated user:", user.firstName, user.lastName); 

//         next();  // ✅ Move to next middleware
//     } catch (err) {
//         console.error("❌ Auth Error:", err.message);
//         return res.status(400).json({ error: "Invalid or expired token" });
//     }
// };

// // Exports
// module.exports = { UserAuth };
