const express = require("express");
const SummaryofConvo = express.Router();
//import the controller
const summaryconvoController = require("../controllers/SummaryOfConvoController.js");

SummaryofConvo.post("/convosummary", summaryconvoController);

module.exports = SummaryofConvo;
