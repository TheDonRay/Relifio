require("dotenv").config();
const mongoose = require("mongoose");

const URI = process.env.mongoSignUpClusterConnectionURI;

// create function to connect to mongoose database here as such
async function signupDBconnect() {
  try {
    const dbconnection = await mongoose.connect(URI);
    console.log("Successfully connected to Sign up Cluster Database");
    return dbconnection;
  } catch (error) {
    console.error("Error connection to Database", error);
  }
}

module.exports = signupDBconnect;
