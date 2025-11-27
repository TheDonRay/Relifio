const dbConnection = require('./signupdbconnection.js'); 
const mongoose = require("mongoose"); 


// set up the schema as such 
const signupSchema = new mongoose.Schema({ 
    email: String, 
    SignedUpOn: { 
        type: Date, 
        default: Date.now
    }, 
});  

module.exports = dbConnection.model("signupschema", signupSchema); 
