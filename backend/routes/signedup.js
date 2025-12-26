const express = require("express"); 
//import the controller here 
const userSignup = require("../controllers/usersignup.js"); 
const signupRoute = express.Router();  


signupRoute.post("/signup", userSignup);  

module.exports = signupRoute;  