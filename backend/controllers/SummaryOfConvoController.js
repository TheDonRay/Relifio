const ConversationSummary = require('../models/conversationSummary.model.js');  

//import the regular conversation model 
const convomodel = require("../models/conversationmodel.js"); 

// Save to database - Once you get the summary response back from the AI API, create a new document using your schema and save it to MongoDB 
const OpenAi = require('openai');  
const client = new OpenAi({ 
    apiKey: process.env.AIKEY
}); 


const SummaryOfConversation = async (req, res) => { 
    // base case to implement + try and catch case  
    try { 
        const { sessionId } = req.body;  
        // set up basic validation case here in the backend  
        if (!sessionId || sessionId.trim() === ""){ 
            return res.status(400).json({ 
                Error: 'No sessionId recieved / found'
            }); 
        } 

        //now that I havethe sessioId i need to query it  
        const foundSessionId = await convomodel.find({sessionId}); 
        // some error handling for this backend part here ->  
        if (!foundSessionId || foundSessionId.length === 0){ 
            return res.status(494).json({ 
                Error: 'No session Id found'
            }); 
        } 
        // get the contents of the models information 
        const UsersConvo = foundSessionId[0].conversationUser; 
        //just for testing purposes log this 
        console.log(UsersConvo);  
        //now we can send it to the AI implementation 
        //Ai implementation later.  
        const AIsummary = await client.chat.completions.create(
            { 
            model: 'gpt-5-nano', 
            message: 'you are a therapist summarize the conversation a user has just had about what they are facing'
            },  
            { 
                content: 'ai', 
                message: [{ConvoSummary: UsersConvo}]
            },
    ); 
    res.send({ AiConvoSummary: AIsummary.choices[0].message.content }); 

    } catch (error) { 
        // error handling  
        console.error('error recieving sessionId and retrieving data', error); 
        return res.status(500).json({ 
            Error: error.message
        }); 
    }
} 

module.exports = SummaryOfConversation; 