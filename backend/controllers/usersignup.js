// include the model here for user sign up
const signupSchema = require("../models/signupmodel");
// add the route here as such

// add some middlware check here for backend validation .
const EmailValidation = (req, res, next) => {
  // implement a try and catch here
  try {
    const { email } = req.body;

    if (!email || email.trim() === "") {
      return res.status(404).json({
        //TODO: Continue validation here
      });
    }
  } catch (error) {
    console.log("Error submitting email", error);
    res.status(404).json({
      response: error,
    });
  }
  // invoke the next function here as such
  next();
};

// now the actual function logic here
// below is async because you are dealing with inserting data into mongodb
const userSignup = async (req, res) => {
  // implement the try and catch case as such
  try {
    const { email } = req.body;
    const newSignup = await signupSchema.create({ email });
    res.status(200).json({
      success: "user successfully signed up",
      data: newSignup,
    });
    console.log(newSignup);
  } catch (error) {
    console.error("Error signing User up", error);
    res.status(500).json({
      message: error,
      SignUpSuccessful: false,
    });
  }
};

module.exports = userSignup;
