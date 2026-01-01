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

module.exports = mongoose.model("signupschema", signupSchema);
