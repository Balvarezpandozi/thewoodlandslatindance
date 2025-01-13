const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { validateLink } = require("../utils/validationHelper");

const AnnouncementSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: {
    type: String,
    validate: {
      validator: validateLink,
      message: "Link is invalid.",
    },
    default: undefined,
  },
  positive: { type: Boolean, default: true },
  showFrom: { type: Date, required: true },
  showUntil: { type: Date, required: true },
});

module.exports = mongoose.model("Announcement", AnnouncementSchema);
