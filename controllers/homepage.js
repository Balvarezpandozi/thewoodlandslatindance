const Announcements = require("../models/announcement");
const DanceClasses = require("../models/danceClass");
const Prices = require("../models/price");
const ViewLocals = require("../utils/ViewLocals");
const { dateToUTCString } = require("../utils/formatHelper");

module.exports.renderHomepage = async (req, res) => {
  const currDate = new Date();

  const announcement = await Announcements.findOne({
    showFrom: { $lte: new Date(dateToUTCString(currDate)) },
    showUntil: { $gte: new Date(dateToUTCString(currDate)) },
  });

  const danceClasses = await DanceClasses.find().sort({ order: 1 });
  const prices = await Prices.find().sort({ order: 1 });

  const viewLocals = new ViewLocals({
    scheduleLink: "#schedule-section",
    pricingLink: "#pricing-section",
    faqsLink: "#faqs-section",
    styleFiles: ["mainpage.css"],
    pageTitle: "The Woodlands Latin Dance - Salsa & Bachata Classes",
    canonicalTag: "",
    announcement: announcement || undefined,
  });
  res.render("main/index", {
    locals: viewLocals,
    danceClasses: danceClasses,
    prices: prices,
  });
};
