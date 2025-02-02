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
});

module.exports = mongoose.model("DanceClass", DanceClassSchema);
