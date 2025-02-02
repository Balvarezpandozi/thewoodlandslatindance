const Announcements = require("../models/announcement");
const DanceClass = require("../models/danceClass");
const { formatDanceClassDates } = require("../utils/formatHelper");
const { validateDanceClassDates } = require("../utils/validationHelper");

module.exports.renderDashboard = async (req, res) => {
  const announcements = await Announcements.find();
  const danceClasses = await DanceClass.find();
  res.render("admin/dashboard", {
    announcements: announcements,
    danceClasses: danceClasses,
  });
};

module.exports.renderNewAnnouncementForm = (req, res) => {
  res.render("admin/newAnnouncement");
};

module.exports.createAnnouncement = async (req, res) => {
  const { title, description, link, positive, showFrom, showUntil } =
    req.body.announcement;

  const newAnnouncement = new Announcements({
    title: title,
    description: description,
    positive: positive == "yes" ? true : false,
    link: link,
    showFrom: new Date(showFrom),
    showUntil: new Date(showUntil),
  });

  await newAnnouncement.save();
  res.redirect(`/adminportal`);
};

module.exports.deleteAnnouncement = async (req, res) => {
  await Announcements.findByIdAndDelete(req.params.id);
  res.redirect(`/adminportal`);
};

module.exports.renderNewClassForm = (req, res) => {
  res.render("admin/newClass");
};

module.exports.createClass = async (req, res) => {
  const { title, description, day, location, time, dates } =
    req.body.danceClass;

  if (!validateDanceClassDates(dates)) {
    throw new Error("Invalid dates");
  }

  const newDanceClass = new DanceClass({
    title: title,
    description: description,
    day: day,
    location: location,
    time: time,
    dates: formatDanceClassDates(dates),
  });

  await newDanceClass.save();
  res.redirect(`/adminportal`);
};

module.exports.deleteClass = async (req, res) => {
  await DanceClass.findByIdAndDelete(req.params.id);
  res.redirect(`/adminportal`);
};
