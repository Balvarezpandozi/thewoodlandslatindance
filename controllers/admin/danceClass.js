const DanceClass = require("../../models/danceClass");
const {
  formatDanceClassDates,
  formatDateClassString,
} = require("../../utils/formatHelper");
const { validateDanceClassDates } = require("../../utils/validationHelper");

module.exports.renderNewClassForm = (req, res) => {
  res.render("admin/danceClass/new");
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

module.exports.renderDanceClass = async (req, res) => {
  let danceClass = await DanceClass.findById(req.params.id);
  res.render("admin/danceClass/index", { danceClass: danceClass });
};

module.exports.deleteClass = async (req, res) => {
  await DanceClass.findByIdAndDelete(req.params.id);
  res.redirect(`/adminportal`);
};

module.exports.renderEditClassForm = async (req, res) => {
  let danceClass = await DanceClass.findById(req.params.id);
  res.render("admin/danceClass/edit", {
    danceClass: danceClass,
    dates: formatDateClassString(danceClass.dates),
  });
};

module.exports.editClass = async (req, res) => {
  const updates = req.body.danceClass;

  if (!validateDanceClassDates(updates.dates)) {
    throw new Error("Invalid dates");
  } else {
    updates.dates = formatDanceClassDates(req.body.danceClass.dates);
  }

  await DanceClass.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });

  res.redirect("/adminportal");
};
