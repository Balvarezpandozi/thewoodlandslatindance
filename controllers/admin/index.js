const Announcements = require("../../models/announcement");
const DanceClass = require("../../models/danceClass");
const Price = require("../../models/price");

module.exports.renderDashboard = async (req, res) => {
  const announcements = await Announcements.find();
  const danceClasses = await DanceClass.find();
  const prices = await Price.find();
  res.render("admin/dashboard", {
    announcements: announcements,
    danceClasses: danceClasses,
    prices: prices,
  });
};
