const express = require("express");
const signupRoute = express.Router(); 
// import the database connection here  
const signupSchema = require("../database/signupSchema.js");  

// initialize the route here to be a post route.  
signupRoute.post('/signup', (req, res) => { 

})


module.exports = signupRoute;
