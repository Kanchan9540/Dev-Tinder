const express = require("express");
const connectDB = require("./config/database");  // require database file
const cookieParser = require("cookie-parser");
const cors = require("cors");


const app = express(); //creating a new express js application or instance of an express js application


//** const { AdminAuth, UserAuth } = require("./middlewares/auth");

app.use(cors());
app.use(express.json()); //this middleware is activated for all the routes. and convert all the json data into a js object
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);


connectDB()  //This is the proper way of connecting the database with your application or server.
.then(() => {
   console.log("Database connection established");
   app.listen(3000, () => {
    console.log("server is successfully listning on port 3000"); // thiscllback func will only be called when the server is up & running.
});
})
.catch((err) => {
    console.error("database cann't be connected");
});
