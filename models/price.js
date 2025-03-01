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
  order: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: Number.isInteger,
      message: "This number is not an integer",
    },
  },
});

module.exports = mongoose.model("Price", PriceSchema);
