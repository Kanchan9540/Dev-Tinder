const validator = require("validator");
//const {  UserAuth } = require("../../routes/auth");

const validateSignUpData = (req) => {
   
    const {firstName, lastName, emailId, password} = req.body;  //All these things extract from the request.body  or destructuring all these things

    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("email is not valid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password");
    }
};

const validateEditProfileData = (req) => {
   const allowedEditFields = ["firstName", "lastname","emailId", "photoUrl", "age", "gender", "about", "skills"];

   const isEditAllowed = Object.keys(req.body).every(field => allowedEditFields.includes(field));

   return isEditAllowed;
};

module.exports = {
    validateSignUpData,
    validateEditProfileData,
};