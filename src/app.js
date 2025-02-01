const express = require("express");
const connectDB = require("./config/database");  // require database file
const User = require("./models/user");

const app = express(); //creating a new express js application or instance of an express js application


// const { AdminAuth, UserAuth } = require("./middlewares/auth");

app.use(express.json()); //this middleware is activated for all the routes. and convert all the json data into a js object

/************************Database schema ******************************** */
//create a API to insert a data into database
app.post("/signup", async (req, res) => {

  //console.log(req.body); //all request postman have send to us and server have receive this request & expres has converted this request into an obj and it will given to us to use it.
  
  // const user = new User({  // new model you want to save this
  //   "firstName": "virat",
  //   "lastName": "Sah",
  //   "emailId": "virat9990@gmail.com",
  //   "password": "virat1234"
  //  }); // creating a new user with this upper data or in technically we can say that the we are creating a new instance of a user model.

  //create a new instance of the user model using this data which we are got from the API.
  const user = new User(req.body);

  try{
    await user.save();  // data will save inside a database. and thisfunction basically return you a function.
    res.send("user added successfully"); //sending back to the response.
  } catch(err){
    res.status(400).send("Error saving the user : " + err.message);
  }
 });


//GET user by email 
app.get("/user", async (req, res) => {
    const useEmail = req.body.emailId;

    try{
        console.log(useEmail);
        const user = await User.findOne({emailId: useEmail}); // find only one data single data from the database.
        // res.send(user);
        if(!user){
            res.status(404).send("User not found!!")
        }
        else{
            res.send(user);
        }
    //  const users = await User.find({emailId: useEmail}); //finding the user from the database
    //  if(users.length === 0){
    //     res.status(404).send("User not found!!")
    //  }
    //  else{
    //     res.send(users);
    //  }

    }
    catch(err){
      res.status(400).send("Something went wrong!!");
    }
   
});


 //Feed API - GET/feed - get all the user from the database
 app.get("/feed", async (req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("Something went wrong!!");
    }

 });

//Delete Data from the Database
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try{
    // const user = await User.findByIdAndDelete({_id: userId});
       const user = await User.findByIdAndDelete(userId);  // It is a shorthand for upper command
       res.send("User deleted successfully");
    }
    catch(err){
        res.status(400).send("Something went wrong!!");
      }
})

// Update data of the user
app.patch("/user/:userId", async (req, res) => {
    // const userId = req.body.userId;
    const userId = req.params?.userId;
    const data = req.body;

    
    try{
        const Allowed_UPDATES = ["photoURL", "skills", "gender", "age", "about"];  

        const isUpdateAllowed = Object.keys(data).every((k) => 
            Allowed_UPDATES.includes(k)
        );
        
        if(!isUpdateAllowed){
            throw new Error("update not allowed");
        }

        if(data?.skills.length > 10){
            throw new Error("skills cannot be more than 10"); 
        }

       await User.findByIdAndUpdate({_id: userId}, data, {
        returnDocument: "after",
        runValidators: true, // enable the validator function.
       });
       res.send("User updated successfully");
    }
    catch(err){
        res.status(400).send("Something went wrong!!");
      }
});

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


// /*********************Error Handling **********************/
// app.get("/getAllData", (req, res) => { 

//     try{
//     //logic of DB call and get user data
//     throw new Error("sgvvn");
//     res.send("All Data Send"); 
//     }
//     catch (err){
//         res.status(500).send("some error contact support team");  //Handle error using try & catch
//     }
    
    
// });

// app.use("/", (err, req, res, next) => {  // here orders matter alot 
//     if(err){  // here we handle the error gracefully
//         res.status(500).send("something went wrong");  
//     }

// })



// /***********************Middleware & Error Handling ************************/
// //you are handle multiple rotes handler
// //app.use("/route", RH1, RH2, RH3, RH4) // you passing like this
// //app.use("/route", [RH1, RH2, RH3, RH4]) // you passing like this
// //app.use("/route", [RH1, RH2], RH3, RH4) // you passing like this all give the same output


// /**********Middleware for Authorization************/
// // handle auth middleware for all request GET, POST & etc.
// app.use("/admin", AdminAuth);  
// //app.use("/user", UserAuth); 

// app.get("/admin/getAllData", (req, res) => { 
//         res.send("All Data Send"); 
// }),

// app.get("/admin/DeleteUser", (req, res) => {   
//    res.send("Delete a user");  
// }),

// app.get("/user/login", (req, res) => {  // here we didn't need authentication or autharization. 
//     res.send("user logged in successfully");  
//  }),

// app.get("/user/data", UserAuth, (req, res) => {  // here firstly user auth is getting checked. here Userauth is middleware 
//     res.send("user Data sent");  
//  }),





// /*!!!!!!!!!!!!!!!!!!!!!!!!!*/




// // app.use("/user",
// //     [(req, res, next) => {   
// //     console.log("Handling the router user"); 
// //     //res.send("Response!");
// //     next(); // help to move the another response 
    
// // },
// // (req, res, next) => {
// //     console.log("Handling the router user 2");  
// //     //res.send("Response 2!");
// //     next();  
// // },
// // (req, res, next) => {
// //     console.log("Handling the router user 3");  
// //     //res.send("Response 3!");
// //     next();
// // },
// // (req, res, next) => {
// //     console.log("Handling the router user 4");  
// //     res.send("Response 4!");
// // }] // we are wrapping all these function inside array.
// // );

// /*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/
// // order of code is matter here

// //GET /users => It checks all the app.xxxx("matching routes") functions
// //GET /users => middleware chain => request handler
//  app.get("/user", (req, res, next) => {   
//      console.log("Handling the router user"); 
//     //res.send("Response!");
//      next(); // help to move the another response 
    
//  }),
//  app.get("/user",
//     (req, res, next) => {  // these function are known as middleware
//      console.log("Handling the router user 2");  
//      res.send("Response 2!");
//       next();  
//  }
// );




// /*$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$*/


// //Request Handler
// // Here the code of the code is very very important and order of routhing matters alot .
// // app.use("/", (req, res) => {    //This code overight everything or its kind of like a wild card.
// //     res.send("Hello Kanchan!!");  //anything matches after this slash This route handler will handle this.
// //  })


// /*******************Dynamic Routing****************
// app.get("/user/:userId", (req, res) => {   // : means its a dynamic routes
//     console.log(req.params);  //This will give the information of query perameter which is present on the URL. This is basically used for the 
//     res.send({"Name": "Kanchan", "Lastname": "Sah"});
// });


// //This will only handle GET call to /user
// // it can also match /user, /user/xyz, /user/1.
// app.get("/user", (req, res) => {
//     console.log(req.query);  //This will give the information of query perameter which is present on the URL.
//     res.send({"Name": "Kanchan", "Lastname": "Sah"});
// });

// app.post("/user", (req, res) => {  // in that case our get call i not interfarering to my post call.
//     //saving data to db
//     res.send("Data Successfully saved to the database !");
// });

// app.delete("/user", (req, res) => {  
//     res.send("Deleted Successfully !");
// });


// /***************Advance routing concepts ******************
// // b is optional here it works with /abc, /ac
// app.get("/ab?c", (req, res) => {
//     res.send({"Name": "Kanchan", "Lastname": "Sah"});
// });

// // you can add as many b as you want to like it works with /abc, /abbbbbc
// app.get("/ab+c", (req, res) => {
//     res.send({"Name": "Kanchan", "Lastname": "Sah"});
// });

// // you can write anything in the place of * like it works with /abcd, /abKANCHANcd
// app.get("/ab*cd", (req, res) => {
//     res.send({"Name": "Kanchan", "Lastname": "Sah"});
// });

// //you also do te grouping there here the (bc) is optional & it works with /abcd, /ad
// app.get("/a(bc)?d", (req, res) => {
//     res.send({"Name": "Kanchan", "Lastname": "Sah"});
// });

// //this regex means if "a" letter i your pathit will work & it works with /cab, /ad
// app.get(/a/, (req, res) => {
//     res.send({"Name": "Kanchan", "Lastname": "Sah"});
// });

// //if route starts with * you can write anything in starting and its end with a fly & it works with /butterfly, /fly, /dragenfly
// app.get(/.*fly$/, (req, res) => {
//     res.send({"Name": "Kanchan", "Lastname": "Sah"});
// });



// ********************** */


// //This will match all the  http method API calls to /test
// app.use("/test", (req, res) => {
//    res.send("Hello from the server!");
// })

// // app.use("/", (req, res) => {    
// //     res.send("Hello Kanchan!!");  
// //  })




// app.listen(3000, () => {
//     console.log("server is successfully listning on port 3000"); // thiscllback func will only be called when the server is up & running.
// })