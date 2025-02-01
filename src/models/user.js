const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({  // passing object here or passing all the perameters that defines a user.
   firstName: {   // define schema its also tells the type of data.
    type: String,
    required: true,
    maxLength: 50,
    minLength: 4,
   },
   lastName: {
    type: String,
   },
   emailId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,  // remove extra wide space in front or back
      validate(value){
        if(!validator.isEmail(value)){
         throw new Error("invalid email address: " + value);
        }
      }
   },
   password: {
      type: String,
      required: true,
   },
   age: {
    type: Number,
    min: 18, 
   },
   gender: {
    type: String,
    validate(value){   //custom validate function
       if(!["male", "female", "other"].includes(value)){
          throw new Error("gender is not valid");
       }
    },
   },
   photoUrl: {
      type: String,
      default: "https://avatars.githubusercontent.com/u/7790161?v=4",
      validate(value){
         if(!validator.isURL(value)){
          throw new Error("invalid URL address: " + value);
         }
       },
   },
   about: {
      type: String,
      default: "This is a default about of the user",
   },
   skills: {
      type: [String],
   },
   
},
{
   timestamps: true,   // its give the update as well as create time
}
);  //Schema basically tells you what all information about the user storing into our database.

// create mongoose model
const UserModel = mongoose.model("User", UserSchema); // here we passingthe name of the model & name of the schema.

module.exports = UserModel;

//first of all you create a schema , then you create a model of of it, now with this model we createa new new instances.