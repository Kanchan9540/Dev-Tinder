const express = require("express");
const { UserAuth } = require("../middlewares/auth");

const requestRouter = express.Router(); 
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

//*****************connection request API *****************/
requestRouter.post("/request/send/:status/:toUserId",
    UserAuth,
    async(req, res) => {
   try{
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status type: " + status });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    
    //if there is a existing connection request
    const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: "Connection Request Already Exists!!" });
      }

    const connectionRequest = new ConnectionRequest({
       fromUserId,
       toUserId,
       status, 
    });
     const data = await connectionRequest.save();
     
     res.json({message: req.user.firstName + " is " + status + " in " + toUser.firstName, data});
   }    
   catch(err){
    res.status(400).send("ERROR: " + err.message);
  };

});

//***********************Request review API******************/
requestRouter.post("/request/review/:status/:requestId", 
 UserAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ messaage: "Status not allowed!" });
      }

      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedInUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res
          .status(404).json({ message: "Connection request not found" });
      }
      connectionRequest.status = status;  // added tge stats here thats is accepted or rejected

      const data = await connectionRequest.save();

      res.json({ message: "Connection request " + status, data });
    } catch (err) {
      res.status(400).send("ERROR: " + err.message);
    }
  }
);

module.exports = requestRouter;


