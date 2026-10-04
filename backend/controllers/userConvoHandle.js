const OpenAi = require("openai");
const client = new OpenAi({
  apiKey: process.env.AIKEY,
});

const ConversationModel = require("../models/conversationmodel.js");

// fallback phrases for spotting someone at risk if the moderation check is unavailable
const crisisPattern =
  /\b(kill(ing)? myself|suicid(e|al)|end (it all|my life)|want to die|don'?t want to (live|be here)|hurt(ing)? myself|self[- ]?harm(ing)?|cut(ting)? myself|overdose|no reason to live|better off dead)\b/i;

// returns true when the message suggests the person may be at risk of harming themselves
const checkForCrisis = async (message) => {
  if (crisisPattern.test(message)) {
    return true;
  }
  try {
    const moderation = await client.moderations.create({
      model: "omni-moderation-latest",
      input: message,
    });
    const categories = moderation.results[0].categories;
    return Boolean(
      categories["self-harm"] ||
        categories["self-harm/intent"] ||
        categories["self-harm/instructions"],
    );
  } catch (error) {
    // the keyword check above already ran, so keep the conversation going
    console.error("crisis check failed", error);
    return false;
  }
};

const systemPrompt = `You are Relifio, a warm, non-judgmental listener for someone who wants to talk through how they feel. You are not a therapist, counselor, or medical professional, and you never claim to be or diagnose anyone. Listen first, reflect back what you hear, and ask gentle open questions. Keep replies short and human.

If the person mentions wanting to die, hurting themselves, or being in danger, respond with care, take it seriously, and encourage them to reach a person right now: call or text 988 in the US, or their local emergency number elsewhere, or someone they trust nearby. Stay with them in the conversation while doing so.`;

const userChapterHandling = async (req, res) => {
  // kept outside the try so a failed reply still tells the frontend about risk
  let crisis = false;
  // implement a try and catch case here for user text convo based on the shcema that we have
  try {
    const { sessionId, message } = req.body;

    if (!message || !sessionId) {
      return res.status(400).json({
        ErrorMessage: "Message and SessionId are required",
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
      console.log(
        "Created a new conversation for the following session:",
        sessionId,
      );
    }
    // now we  need to add user message to conversation
    conversation.conversationUser.push({
      sender: "user",
      message: message,
    });

    // check for risk before the reply so the frontend can show crisis resources right away
    crisis = await checkForCrisis(message);

    //do the AI implementation here using GPT response for now.
    const airesponse = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const aiMessage = airesponse.choices[0].message.content;

    conversation.conversationUser.push({
      sender: "ai",
      message: aiMessage,
    });

    await conversation.save();
    console.log("conversation successfully saved");

    //sending it back to the frontend.
    res.status(200).json({
      success: true,
      airesponse: aiMessage,
      crisis: crisis,
      conversationId: conversation._id,
    });
  } catch (error) {
    console.error("error processing message", error);
    res.status(500).json({
      error: "Failed to process message",
      crisis: crisis,
      details: error.message,
    });
  }
};

module.exports = userChapterHandling;
