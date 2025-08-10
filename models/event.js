const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  validateUSPhoneNumber,
  validateEmail,
} = require("../utils/validationHelper");

const EventSchema = new Schema({
  timestamp: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "Corporate Event",
      "Private Party",
      "Wedding",
      "Networking Mixer",
      "Other",
    ],
    required: true,
  },
  eventDate: { type: Date, required: true },
  guestCount: {
    type: String,
    required: true,
  },
  extra: {
    type: String,
    enum: [
      "Only need a venue",
      "Only need a DJ",
      "Need both venue and DJ",
      "Don’t need either",
      "Not sure yet",
    ],
    required: true,
  },
  fullName: { type: String, required: true, trim: true },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: validateUSPhoneNumber,
      message: (props) => `${props.value} is not a valid phone number`,
    },
  },
  email: {
    type: String,
    required: true,
    lowercase: true, // stores as lowercase
    trim: true,
    validate: {
      validator: validateEmail,
      message: (props) => `${props.value} is not a valid email`,
    },
  },
});

module.exports = mongoose.model("Event", EventSchema);
