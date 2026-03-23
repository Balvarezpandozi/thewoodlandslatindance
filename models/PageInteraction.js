const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PageInteraction = new Schema({
  url: { type: String, required: true },
  type: {
    type: String,
    enum: ["view", "saleButton", "Redirection"],
    required: true,
  },
  timestamp: { type: Date, required: true },
});

module.exports = mongoose.model("PageInteraction", PageInteraction);
