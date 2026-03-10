const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DanceClassSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  day: { type: String, required: true },
  dates: [
    {
      month: { type: String },
      dates: { type: String },
    },
  ],
  time: { type: String, required: true },
  location: { type: String, required: true },
  order: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: Number.isInteger,
      message: "This number is not an integer",
    },
  },
  addressRegion: { type: String },
  addressLocality: { type: String },
  streetAddress: { type: String },
  postalCode: { type: String },
  url: { type: String, required: true },
  buttonPrompt: { type: String, required: true },
});

module.exports = mongoose.model("DanceClass", DanceClassSchema);
