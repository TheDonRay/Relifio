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

//Todo: Create another schema design here. 

module.exports = mongoose.model("signupschema", signupSchema);
