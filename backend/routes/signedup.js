const express = require("express");
const signupRoute = express.Router(); 
// import the database connection here  
const dbConnection = require("../database/dbconnection.js");

//going to be a backend post request that will be sent to my database
//TODO: This route change it back to POST request since we are updating the data base with users interested

signupRoute.get("/signup", (req, res) => {
  try {
    //TODO: implement the sign up page for users to be able to sign up for relief.io and send it to the mongo database
    //for now we can have this:
    const TemPData = {
      message:
        "set up database and data to be pushed into the database upon user signing up",
    };
    res.status(200).json(TemPData);
  } catch (error) {
    res.status(500).send("Error with sending Data to the database", error);
  }
});

module.exports = signupRoute;
