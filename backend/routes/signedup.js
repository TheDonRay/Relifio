const express = require("express");
//import the controller here the emailValidation is the middleware
const { userSignup, EmailValidation } = require("../controllers/usersignup.js");
const signupRoute = express.Router();

signupRoute.post("/signup", EmailValidation, userSignup);

module.exports = signupRoute;
