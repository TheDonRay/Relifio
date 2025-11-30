require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");

// call mongodb connection
const signupConnection = require("./database/signupdbconnection.js");
signupConnection();

// ----- CORS + middleware -----
const allowedOrigins = [
  "https://relifio.vercel.app", // your Vercel frontend
];

app.use(bodyparser.json());
app.use(express.json());

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// // handle preflight requests
// app.options("*", cors());
// // ------------------------------

// import routes
const signupRoute = require("./routes/signedup.js");
const APIcall = require("./routes/api.js");

const PORT = process.env.PORT || 2400;

app.get("/", (req, res) => {
  res.json({
    BackendResponse: "server is running",
  });
});

// mount routes
app.use("/api", signupRoute);
app.use("/api", APIcall);

app.listen(PORT, () => {
  console.log(`Server is Successfully running on port ${PORT}`);
});
