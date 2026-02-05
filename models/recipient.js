const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { validateEmail } = require("../utils/validationHelper");

const RecipientSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    validate: {
      validator: validateEmail,
      message:
        "Email is invalid. It must have the following format example@example.com",
    },
  },
  subscribed: { type: Boolean, default: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("Recipient", RecipientSchema);
