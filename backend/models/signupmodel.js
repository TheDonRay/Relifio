const mongoose = require("mongoose");

// set up the schema as such
const signupSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  SignedUpOn: {
    type: Date,
    default: Date.now, // basically tells us when the user signed up on
  },
}); 

//Todo: Create another collection design here for user user authentication 


//TODO: create another collection for User text 


module.exports = mongoose.model("signupschema", signupSchema);
