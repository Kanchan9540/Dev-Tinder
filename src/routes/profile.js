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
  try {
      //console.log("📩 Received request body:", req.body); // Log request data

      if (!req.body || Object.keys(req.body).length === 0) {
          return res.status(400).json({ error: "Request body cannot be empty" });
      }

      const loggedInUser = req.user;
      //console.log("👤 Current User:", loggedInUser); // Log current user data

      if (!loggedInUser) {
          return res.status(400).json({ error: "User not found" });
      }

      // Ensure only defined values are updated
      Object.keys(req.body).forEach((key) => {
          if (req.body[key] !== undefined) {
              loggedInUser[key] = req.body[key];
          }
      });

      await loggedInUser.save();

      res.json({
          message: `${loggedInUser.firstName}, your profile was edited successfully`,
          data: loggedInUser,
      });
  } catch (err) {
      console.error("🔥 Error in profile update:", err); // Log backend errors
      res.status(400).json({ error: err.message });
  }
});


module.exports = profileRouter;