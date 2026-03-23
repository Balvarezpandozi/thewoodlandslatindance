const DanceClass = require("../../models/danceClass");
const { formatDanceClassDates } = require("../../utils/formatHelper");
const { validateDanceClassDates } = require("../../utils/validationHelper");

module.exports.renderNewClassForm = (req, res) => {
  res.render("admin/newClass");
};

module.exports.createClass = async (req, res) => {
  const {
    title,
    description,
    day,
    location,
    time,
    dates,
    buttonPrompt,
    url,
    order,
  } = req.body.danceClass;

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
    buttonPrompt: buttonPrompt,
    url: url,
    order: order,
  });

  await newDanceClass.save();
  res.redirect(`/adminportal`);
};

module.exports.deleteClass = async (req, res) => {
  await DanceClass.findByIdAndDelete(req.params.id);
  res.redirect(`/adminportal`);
};
