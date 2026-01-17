//TODO: need to make and import the conversation Summary schema model 

//TODO implement the OpenAi set up to handle the user summary  
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