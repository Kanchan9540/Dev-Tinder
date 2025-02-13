//**These file manage the routes which is specific to autharization

const express = require("express");
const authRouter = express.Router();  //Creating a router
const {validateSignUpData} = require("../config/utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

//************************Database schema/ Signup API******************************** */
//create a API to insert a data into database //**app.use == router.use both are almost similar */
authRouter.post("/signup", async (req, res) => {

    try{
    //Validation of data
    validateSignUpData(req); // whatever the request is comming we are validating to here.
  
    const {firstName, lastName,emailId, password} = req.body;  //extracting the things out.
   
    // Encrypt the password*******************
    const passwordHash = await bcrypt.hash(password, 10);  //more the number of salt round toufghest the password to decrypt. or 10 => saltRound
    console.log(passwordHash);  // creating the password hash
  
    //create a new instance of the user model using this data which we are got from the API.
    const user = new User({firstName, lastName, emailId, password:passwordHash}); // only these fields are allowed. 
  
      await user.save();  // data will save inside a database. and thisfunction basically return you a function.
      res.send("user added successfully"); //sending back to the response.
    } catch(err){
      res.status(400).send("Error : " + err.message);
    }
   });

//*****************login API *****************/
authRouter.post("/login", async (req, res) => {
    
    try{
        const {emailId, password} = req.body;
        
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Credentials");
        }

        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){

        // create a JWT Token
        const token = await user.getJWT();
        


        //Add the token to cookie and send the response back to the user.
        res.cookie("token", token, {expires: new Date(Date.now() + 8 * 3600000)});  // I will send this token back to the user.
        res.send("Login Successfully!!!!");
        }
        else{
            throw new Error("Invalid Credentials")
        }

    } catch (err){
      res.status(400).send("ERROR: " + err.message);
    }
}); 




module.exports = authRouter;

