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
};
