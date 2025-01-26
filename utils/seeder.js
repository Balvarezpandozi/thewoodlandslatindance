// This is disposable code to populate the database with dummy data. DO NOT USE IN PRODUCTION. DO NOT TEST
require("dotenv").config();
const Database = require("../services/database");
database = new Database();
const Redirection = require("../models/redirection");
const Announcement = require("../models/announcement");

database.connect();

//Redirection.deleteMany({});

// SCHEDULE
// const redirection1 = new Redirection({
//   redirectionID: "SignUp01",
//   locationDescription: "Bryan's mobile sign up qr code",
//   urlRedirection: "https://member.life/thewoodlandslatindance/register",
// });
// redirection1.save();

// const redirection2 = new Redirection({
//   redirectionID: "GoogleReviews01",
//   locationDescription: "Bryan's mobile google review qr code",
//   urlRedirection: "https://g.page/r/CZjClEn1PQilEBM/review",
// });
// redirection2.save();

const redirection3 = new Redirection({
  redirectionID: "FlyerLocation01",
  locationDescription: "TBD (Restaurant)",
  urlRedirection: "https://TheWoodlandsLatinDance.com",
});
redirection3.save();

//Announcement
// const date = new Date().toLocaleString();
// console.log(date);
// console.log(new Date());

// const announcement = new Announcement({
//   title: "Test Announcement",
//   description: "Announcement description 🕺🏻",
//   showFrom: new Date("2025-01-11T00:00:00.000Z"),
//   showUntil: new Date("2025-01-13T00:00:00.000Z"),
//   positive: true,
// });

// announcement.save();
// console.log("Done saving");
