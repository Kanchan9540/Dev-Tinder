const express = require("express");

const app = express(); //creating a new express js application or instance of an express js application

//Request Handler
// Here the code of the code is very very important and order of routhing matters alot .
// app.use("/", (req, res) => {    //This code overight everything or its kind of like a wild card.
//     res.send("Hello Kanchan!!");  //anything matches after this slash This route handler will handle this.
//  })

//This will only handle GET call to /user
app.get("/user", (req, res) => {
    res.send({"Name": "Kanchan", "Lastname": "Sah"});
});

app.post("/user", (req, res) => {  // in that case our get call i not interfarering to my post call.
    //saving data to db
    res.send("Data Successfully saved to the database !");
});

app.delete("/user", (req, res) => {  
    res.send("Deleted Successfully !");
});


//This will match all the  http method API calls to /test
app.use("/test", (req, res) => {
   res.send("Hello from the server!");
})

// app.use("/", (req, res) => {    
//     res.send("Hello Kanchan!!");  
//  })

app.listen(3000, () => {
    console.log("server is successfully listning on port 3000"); // thiscllback func will only be called when the server is up & running.
})