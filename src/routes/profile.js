const express = require("express");
const { UserAuth } = require("../middlewares/auth");

const profileRouter = express.Router(); 


//*****************profile API *****************/
profileRouter.get("/profile", UserAuth, async (req, res) => {

    try{ 
     const user = req.user;

     res.send(user);
    }catch (err) {
     res.status(400).send("ERROR: " + err.message);
    }
});

module.exports = profileRouter;