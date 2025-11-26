const express = require("express");
const APIroute = express.Router();

//TODO: call the API here as such
// TODO: using the new gemini model.

APIroute.get("/response", (req, res) => {
  res.json({
    APIroute:
      "this route is for the actual api set up and what the AI will say to the user given the text inputed from the chat box",
  });
});

module.exports = APIroute;
