const validator = require("validator");

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

module.exports = {
    validateSignUpData,
};