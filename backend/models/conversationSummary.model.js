const mongoose = require("mongoose");

const ConversationSummary = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    ConvoSummary: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 3000,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("convosummary", ConversationSummary);
