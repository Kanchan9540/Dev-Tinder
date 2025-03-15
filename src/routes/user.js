const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

const { UserAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all the pending connection request for the loggedIn user
userRouter.get("/user/requests/received", UserAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
    
        const connectionRequests = await ConnectionRequest.find({
          toUserId: loggedInUser._id,
          status: "interested",
         }).populate("fromUserId", USER_SAFE_DATA);
         //}).populate("fromUserId", ["firstName", "lastName"]);
         //joining the data frm 2 collection(user, connectionRequest) using ref and populate. 
        
        res.json({
          message: "Data fetched successfully",
          data: connectionRequests,
        });
      } catch (err) {
        req.statusCode(400).send("ERROR: " + err.message);
      }
});

// Get the user connection data
userRouter.get("/user/connection", UserAuth, async (req, res) => {
  try{
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
     .populate("fromUserId", USER_SAFE_DATA)
     .populate("toUserId", USER_SAFE_DATA);

    // console.log(connectionRequests);

     const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({data});
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

//Feed API
userRouter.get("/feed", UserAuth, async (req, res) => {
  try{
   
  //User should see all the user cards except  
  // 0. his own card
  // 1. his connection
  // 2. ignored people
  // 3. already sent the connection request

  const loggedInUser = req.user;

  //pagenation
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  limit = limit > 50 ? 50 : limit;
  const skip = (page - 1) * limit;

  //Find all connection requests (sent + received)
  const connectionRequests = await ConnectionRequest.find({
    $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser }],
  }).select("fromUserId  toUserId");

  //hide the user which is repeated or send the request and accpt the request
  const hideUsersFromFeed = new Set();
  connectionRequests.forEach((req) => {
    hideUsersFromFeed.add(req.fromUserId.toString());
    hideUsersFromFeed.add(req.toUserId.toString());
  });

  //Db Call find all the user whose id is not pesent in the hideUser 
  const users = await User.find({
    $and: [
      { _id: { $nin: Array.from(hideUsersFromFeed) } },
      { _id: { $ne: loggedInUser._id } },
    ],
  })
   .select(USER_SAFE_DATA)
   .skip(skip)
   .limit(limit);
   
   // console.log(hideUsersFromFeed);

    res.json({ data: users });
  }
  catch(err){
    res.status(400).json({ message: err.message });
  }
});
  


module.exports = userRouter;