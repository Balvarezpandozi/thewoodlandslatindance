const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    min: [0.01, "Price must be positive"],
    required: true,
  },
  isDisabled: { type: Boolean, default: false },
  buttonPrompt: { type: String, required: true },
  contactBooking: { type: Boolean, default: false },
});

module.exports = mongoose.model("Price", PriceSchema);
