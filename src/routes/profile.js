const express = require("express");
const { UserAuth } = require("../middlewares/auth");
const {validateEditProfileData} = require("../config/utils/validation");

const profileRouter = express.Router(); 


//*****************profile View API *****************/
profileRouter.get("/profile/view", UserAuth, async (req, res) => {

    try{ 
     const user = req.user;

     res.send(user);
    }catch (err) {
     res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = profileRouter;

//**************Profile Edit ******************/
profileRouter.patch("/profile/edit", UserAuth, async (req, res) => {
   try{
    if(!validateEditProfileData(req)){
        throw new Error("Invalid Edit Request");
    }
      const loggedInUser = req.user;
      Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
      
      await loggedInUser.save();

      res.json({
        message: `${loggedInUser.firstName}, your profile edit successsfully`,
        data: loggedInUser,
      });
   }
   catch(err){
    res.status(400).send("ERROR :" + err.message);
   }
});

module.exports = profileRouter;