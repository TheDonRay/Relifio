//External API route here
const express = require("express");
const Userconversation = express.Router();
const userChapterHandling = require("../controllers/userConvoHandle.js");

Userconversation.post("/userconvo", userChapterHandling);

module.exports = Userconversation;
