const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");

// ----- CORS + middleware -----
app.use(cors()); // allow all origins for now
// app.options("*", cors());     // handle all preflight requests

app.use(bodyparser.json());
app.use(express.json());

// import routes
const signupRoute = require("./routes/signedup.js");
const userConvo = require("./routes/Userconversation.js"); 
const userSummaryConversation = require('./routes/UserSummaryConversation.js'); 

app.get("/", (req, res) => {
  res.json({
    BackendResponse: "server is running",
  });
});

// call the routes here.
app.use("/api", signupRoute);
app.use("/api", userConvo); 
app.use('')

module.exports = app;
