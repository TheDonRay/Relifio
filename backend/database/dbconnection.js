require("dotenv").config();  

const express = require("express"); 
const mongoose = require('mongoose');  

const URI = process.env.mongoSignUpClusterConnectionURI; 

// create function to connect to mongoose database here as such 
function signupDBconnect() { 
    mongoose
        .connect(URI) 
        .then(() => console.log('Successfully connected to mongodb')) 
        .catch(err => console.error(err)); 
} 

module.exports = signupDBconnect; 