const mongoose = require("mongoose");

//url for connecting the cluster or its a way to connect the mongoose cluster

const connectDB = async () => {  //return a promise 
await mongoose.connect(
    "mongodb+srv://kanch9990:4Cm8JLsI2S14427m@cluster0.f78ti.mongodb.net/devTinder" //mongodb.net/helloworld in that case it connect the perticular database otherwise it connect to the whole cluster. 
);
};

module.exports = connectDB;  // export the Database from this file










