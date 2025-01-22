const express = require("express");

const app = express(); //creating a new express js application or instance of an express js application

/***********************Middleware & Error Handling ************************/
//you are handle multiple rotes handler
//app.use("/route", RH1, RH2, RH3, RH4) // you passing like this
//app.use("/route", [RH1, RH2, RH3, RH4]) // you passing like this
//app.use("/route", [RH1, RH2], RH3, RH4) // you passing like this all give the same output

app.use("/user", 
    [(req, res, next) => {   
    console.log("Handling the router user"); 
    //res.send("Response!");
    next(); // help to move the another response 
    
},
(req, res, next) => {
    console.log("Handling the router user 2");  
    //res.send("Response 2!");
    next();  
},
(req, res, next) => {
    console.log("Handling the router user 3");  
    //res.send("Response 3!");
    next();
},
(req, res, next) => {
    console.log("Handling the router user 4");  
    res.send("Response 4!");
}] // we are wrapping all these function inside array.
);




/***********************************/


//Request Handler
// Here the code of the code is very very important and order of routhing matters alot .
// app.use("/", (req, res) => {    //This code overight everything or its kind of like a wild card.
//     res.send("Hello Kanchan!!");  //anything matches after this slash This route handler will handle this.
//  })


/*******************Dynamic Routing****************
app.get("/user/:userId", (req, res) => {   // : means its a dynamic routes
    console.log(req.params);  //This will give the information of query perameter which is present on the URL. This is basically used for the 
    res.send({"Name": "Kanchan", "Lastname": "Sah"});
});


//This will only handle GET call to /user
// it can also match /user, /user/xyz, /user/1.
app.get("/user", (req, res) => {
    console.log(req.query);  //This will give the information of query perameter which is present on the URL.
    res.send({"Name": "Kanchan", "Lastname": "Sah"});
});

app.post("/user", (req, res) => {  // in that case our get call i not interfarering to my post call.
    //saving data to db
    res.send("Data Successfully saved to the database !");
});

app.delete("/user", (req, res) => {  
    res.send("Deleted Successfully !");
});


/***************Advance routing concepts ******************
// b is optional here it works with /abc, /ac
app.get("/ab?c", (req, res) => {
    res.send({"Name": "Kanchan", "Lastname": "Sah"});
});

// you can add as many b as you want to like it works with /abc, /abbbbbc
app.get("/ab+c", (req, res) => {
    res.send({"Name": "Kanchan", "Lastname": "Sah"});
});

// you can write anything in the place of * like it works with /abcd, /abKANCHANcd
app.get("/ab*cd", (req, res) => {
    res.send({"Name": "Kanchan", "Lastname": "Sah"});
});

//you also do te grouping there here the (bc) is optional & it works with /abcd, /ad
app.get("/a(bc)?d", (req, res) => {
    res.send({"Name": "Kanchan", "Lastname": "Sah"});
});

//this regex means if "a" letter i your pathit will work & it works with /cab, /ad
app.get(/a/, (req, res) => {
    res.send({"Name": "Kanchan", "Lastname": "Sah"});
});

//if route starts with * you can write anything in starting and its end with a fly & it works with /butterfly, /fly, /dragenfly
app.get(/.*fly$/, (req, res) => {
    res.send({"Name": "Kanchan", "Lastname": "Sah"});
});



********************** */


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