const express = require("express");
const { UserAuth } = require("../middlewares/auth");

const requestRouter = express.Router(); 

//*****************connection request API *****************/
requestRouter.post("/sendConnectionRequest", UserAuth, async(req, res) => {
    const user = req.user;
    //sending a connection request
   console.log("sending a connection request");
   res.send(user.firstName  + " - connection request send");
});

module.exports = requestRouter;