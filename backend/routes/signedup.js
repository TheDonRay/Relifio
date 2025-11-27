const express = require("express");
const signupRoute = express.Router();
// import the database connection here
const signupSchema = require("../database/signupSchema.js");

// initialize the route here to be a post route.
signupRoute.post("/signup", async (req, res) => {
  //The route is async because we are sending data to the frontend.
  // from the frontend we will get the text from the sign up box
  // set up a try and catch case to handle the input
  try { 
    // console.log(req.body); 
    const { email } = req.body; 
    // console.log("Email recieved", email);  
    //TODO: need to add error handling etc 
    const newSignup = signupSchema.create({email});
    res.status(200).json({
      success: "user has Signed up details sent to database",
      data: newSignup,
    });
    console.log(newSignup); // for debugging purposes.
  } catch (error) {
    console.error("Error sending to the cluster in mongoDB", error);
    res.status(500).json({
      message: error,
      isSuccessful: false,
    });
  }
});

module.exports = signupRoute;
