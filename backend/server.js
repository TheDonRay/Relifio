require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");

// call mongodb connection
const signupConnection = require("./database/signupdbconnection.js");
signupConnection();

// set up middleware
app.use(bodyparser.json());
app.use(express.json());
app.use(cors()); // for frontend etc.

//import routes here as such
const signupRoute = require("./routes/signedup.js");
// import the route here as such
const APIcall = require("./routes/api.js");

const PORT = process.env.PORT || 2400;

app.get("/", (req, res) => {
  res.json({
    BackendResponse: "server is running",
  });
});

//mount route here to the expressApp as such
app.use("/api/", signupRoute);
app.use("/api/", APIcall);

app.listen(PORT, () => {
  console.log(
    `Server is Successfully running on the following localhost: http://localhost:${PORT}`,
  );
});
