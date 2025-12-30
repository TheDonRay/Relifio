//External API route here  
const express = require('express');  
const externalAPI = express.Router();   
const userChapterHandling = require("../controllers/userTextHandle.js")

externalAPI.post('/usertext', userChapterHandling); 

module.exports = externalAPI; 