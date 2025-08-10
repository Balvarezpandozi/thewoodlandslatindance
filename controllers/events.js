const ViewLocals = require("../utils/ViewLocals");
const Event = require("../models/event");
const EmailSender = require("../utils/EmailSender");
const ldjson = require("../utils/linkedDataJSON");

module.exports.renderEventsFunnel = (req, res) => {
  const viewLocals = new ViewLocals({
    styleFiles: ["events.css"],
    canonicalTag: "salsaBachataEvents",
    pageTitle: "Hire Salsa Instructor for Events | The Woodlands Latin Dance",
    linkedDataJson: ldjson.eventsPageLDJSON,
  });
  res.render("events/index", {
    locals: viewLocals,
  });
};

module.exports.requestQuote = async (req, res) => {
  try {
    const { type, extra, fullName, date, email, phone, guestCount } =
      req.body.event;

    const newEventLead = new Event({
      timestamp: new Date(),
      type: type,
      eventDate: date,
      guestCount: guestCount,
      extra: extra,
      fullName: fullName,
      email: email,
      phone: phone,
    });

    await newEventLead.save();

    //Send email notifiying me of the quote request
    const mailer = new EmailSender();
    await mailer.sendEmail("TheWoodlandsLatinDance@gmail.com", {
      templateName: "EventLead",
      event: newEventLead,
    });

    res.json({ message: "Quote request received successfully" });
  } catch (error) {
    res.status(500).json({
      error:
        "Failed to process quote request. Contacts us to this number: +1 (281) 202-2058",
    });
  }
};

// module.exports.renderNewAnnouncementForm = (req, res) => {
//   res.render("admin/newAnnouncement");
// };

// module.exports.createAnnouncement = async (req, res) => {
//   const { title, description, link, positive, showFrom, showUntil } =
//     req.body.announcement;

//   const newAnnouncement = new Announcements({
//     title: title,
//     description: description,
//     positive: positive == "yes" ? true : false,
//     link: link,
//     showFrom: new Date(showFrom),
//     showUntil: new Date(showUntil),
//   });

//   await newAnnouncement.save();
//   res.redirect(`/adminportal`);
// };

// module.exports.deleteAnnouncement = async (req, res) => {
//   await Announcements.findByIdAndDelete(req.params.id);
//   res.redirect(`/adminportal`);
// };

// module.exports.renderNewClassForm = (req, res) => {
//   res.render("admin/newClass");
// };

// module.exports.createClass = async (req, res) => {
//   const { title, description, day, location, time, dates, order } =
//     req.body.danceClass;

//   if (!validateDanceClassDates(dates)) {
//     throw new Error("Invalid dates");
//   }

//   const newDanceClass = new DanceClass({
//     title: title,
//     description: description,
//     day: day,
//     location: location,
//     time: time,
//     dates: formatDanceClassDates(dates),
//     order: order,
//   });

//   await newDanceClass.save();
//   res.redirect(`/adminportal`);
// };

// module.exports.deleteClass = async (req, res) => {
//   await DanceClass.findByIdAndDelete(req.params.id);
//   res.redirect(`/adminportal`);
// };

// module.exports.renderNewPriceForm = (req, res) => {
//   res.render("admin/newPrice");
// };

// module.exports.createPrice = async (req, res) => {
//   const {
//     name,
//     description,
//     price,
//     isDisabled,
//     buttonPrompt,
//     contactBooking,
//     order,
//     url,
//   } = req.body.price;

//   const newPrice = new Price({
//     name: name,
//     description: description,
//     price: price,
//     isDisabled: "yes" == isDisabled ? true : false,
//     buttonPrompt: buttonPrompt,
//     contactBooking: "yes" == contactBooking ? true : false,
//     order: order,
//     url: url,
//   });

//   await newPrice.save();
//   res.redirect(`/adminportal`);
// };

// module.exports.deletePrice = async (req, res) => {
//   await Price.findByIdAndDelete(req.params.id);
//   res.redirect(`/adminportal`);
// };
