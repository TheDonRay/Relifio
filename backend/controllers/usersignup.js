// include the model here for user sign up
const signupSchema = require("../models/signupmodel");
// add the route here as such

// add some middlware check here for backend validation .
const EmailValidation = (req, res, next) => {
  // implement a try and catch here
  try {
    const { email } = req.body;

    // get the email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email.trim())) {
      return res.status(404).json({
        emailValid: "Email is not valid",
      });
    }
    next(); // goes to the next controller function only if validation passes then calls the next function in our controller.
  } catch (error) {
    console.log("Error submitting email", error);
    res.status(404).json({
      response: error,
    });
  }
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

module.exports = { userSignup, EmailValidation };
//instead of module.exports = nameofFunction we can write exports.FunctionName in our controller file.
