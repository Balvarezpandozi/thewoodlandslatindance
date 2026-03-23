const Announcements = require("../../models/announcement");

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
