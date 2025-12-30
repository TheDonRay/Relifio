//TODO:  May need to call the database model but we can modify that a bit letter to add it here 
// TODO: Need to incorporate the API call 
const userChapterHandling = async (req, res) => { 
  // implement a try and catch case here 
  try {
    const { message } = req.body;
    res.status(200).json({
      messageRecieved: message,
    });
  } catch (error) {
    console.error("Backend did not get a response", error);
    res.json({
      ErrorMessage: error,
    });
  }
};

module.exports = userChapterHandling;
