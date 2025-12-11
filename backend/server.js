require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");

// call mongodb connection
const signupConnection = require("./database/signupdbconnection.js");
signupConnection();

// ----- CORS + middleware -----
app.use(cors()); // allow all origins for now
// app.options("*", cors());     // handle all preflight requests

app.use(bodyparser.json());
app.use(express.json());
// ------------------------------

// import routes
const signupRoute = require("./routes/signedup.js");
const APIcall = require("./routes/api.js");

const PORT = process.env.PORT || 2400;

app.get("/", (req, res) => {
  res.json({
    BackendResponse: "server is running",
  });
});

app.use("/api", signupRoute);
app.use("/api", APIcall);

app.listen(PORT, () => {
  console.log(`Server is Successfully running on port ${PORT}`);
});
