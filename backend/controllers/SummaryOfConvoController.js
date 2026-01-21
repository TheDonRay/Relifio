const ConversationSummary = require("../models/conversationSummary.model.js");

//import the regular conversation model
const convomodel = require("../models/conversationmodel.js");

// Save to database - Once you get the summary response back from the AI API, create a new document using your schema and save it to MongoDB
const OpenAi = require("openai");
const client = new OpenAi({
  apiKey: process.env.AIKEY,
});

const SummaryOfConversation = async (req, res) => {
  // base case to implement + try and catch case
  try {
    const { sessionId } = req.body;
    // set up basic validation case here in the backend
    if (!sessionId || sessionId.trim() === "") {
      return res.status(400).json({
        Error: "No sessionId recieved / found",
      });
    }

    //now that I havethe sessioId i need to query it
    const foundSessionId = await convomodel.find({ sessionId });
    // some error handling for this backend part here ->
    if (!foundSessionId || foundSessionId.length === 0) {
      return res.status(494).json({
        Error: "No session Id found",
      });
    }
    // get the contents of the models information
    const UsersConvo = foundSessionId[0].conversationUser;

    // Format conversation for AI
    const conversationText = UsersConvo.map(
      (msg) => `${msg.sender}: ${msg.message}`,
    ).join("\n");

    //send to AI for summary
    const AIsummary = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Based on the user's conversation, you act as a therapist by thoughtfully understanding their concerns, summarizing the core challenges they are facing, and providing an in-depth analysis along with constructive guidance to help them grow both personally and emotionally",
        },
        {
          role: "user",
          content: conversationText,
        },
      ],
    });

    // Save summary to database
    const savedSummary = await ConversationSummary.create({
      sessionId,
      ConvoSummary: AIsummary.choices[0].message.content,
    });
    console.log('Summary convo successfully saved'); 
    res.json({ AiConvoSummary: savedSummary.ConvoSummary }); // this is the response i get from the backend -> frontend. 
  } catch (error) {
    // error handling
    console.error("error recieving sessionId and retrieving data", error);
    return res.status(500).json({
      Error: error.message,
    });
  }
};

module.exports = SummaryOfConversation;
