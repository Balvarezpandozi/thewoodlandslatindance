const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;
const { validateEmail } = require("../utils/validationHelper");

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: validateEmail,
      message:
        "Email is invalid. It mus have the following format example@example.com",
    },
  },
  admin: { type: Boolean, required: true },
});
UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

module.exports = mongoose.model("User", UserSchema);
