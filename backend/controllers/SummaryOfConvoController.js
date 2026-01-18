//TODO: need to make and import the conversation Summary schema model 

//The Plan: Exactly right! Here's the flow:

// Create a schema - Define a Mongoose schema for storing conversation summaries (e.g., SummarySchema with fields like sessionId, userId, summary, createdAt, etc.)

// Pass to AI - Send the conversation data to OpenAI to generate a summary

// Save to database - Once you get the summary response back from the API, create a new document using your schema and save it to MongoDB
const OpenAi = require('openai');  
const client = new OpenAi({ 
    apiKey: process.env.AIKEY
}); 



const SummaryOfConversation = async (req, res) => { 
    // base case to implement + try and catch case  
    try { 
        const { sessionId } = req.body;  
        // set up basic validation case here in the backend  
        
        //also implement the AI implementation

    } catch { 
        // error handling 
    }
} 

module.exports = SummaryOfConversation; 