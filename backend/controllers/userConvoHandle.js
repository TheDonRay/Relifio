//TODO:  May need to call the database model but we can m 
//import the model here as such 
const ConversationModel = require("../models/conversationmodel.js"); 

const userChapterHandling = async (req, res) => {
  // implement a try and catch case here for user text convo based on the shcema that we have  
  try {  
    const { sessionId, message } = req.body;  

    if (!message || !sessionId) { 
      res.status(400).json({ 
        ErrorMessage: 'Message and SessionId are required'
      });
    }  

    let conversation = await ConversationModel.findOne({ sessionId });  

    // if there is no conversation found then we can create one 
    if (!conversation) { 
      // create the data by referencing the schema model as such 
      conversation = await ConversationModel.create({ 
        sessionId, 
        //call the array which holds the actual conversation user 
        conversationUser: [],
      }); 
      console.log('Created a new conversation for the following session:', sessionId); 
    } 
    // now we  need to add user message to conversation 
    conversation.conversationUser.push({ 
      sender: 'user',
      message: message,
    });   

    //do the AI implementation here. 
    // just going to place like a test ai response before we incorporate the actual ai response 
    const airesponse = "I hear you, tell me more about this"; 

    conversation.conversationUser.push({ 
      sender: 'ai', 
      message: airesponse,
    }); 

    await conversation.save(); 
    console.log('conversation successfully saved');  

    res.status(200).json({ 
      success: true, 
      airesponse: airesponse, 
      conversationId: conversation._id, 
    }); 

  } catch (error) { 
    consone.error('error processing message', error); 
    res.status(500).json({ 
      error: "Failed to process message",
      details: error.message
    }); 
  }; 
};

module.exports = userChapterHandling;
