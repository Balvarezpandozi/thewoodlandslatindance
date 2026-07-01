const PageInteraction = require("../models/PageInteraction");
const ViewLocals = require("../utils/ViewLocals");
const ldjson = require("../utils/linkedDataJSON");

module.exports.renderBachataCrashCourse = (req, res) => {
  const viewLocals = new ViewLocals({
    styleFiles: ["specialClass.css"],
    canonicalTag: "bachataCrashCourse",
    pageTitle: "Bachata From Scratch - Beginners | The Woodlands Latin Dance",
    linkedDataJson: ldjson.bachataCrashCourse,
  });

  res.render("events/specialClass", {
    locals: viewLocals,
    danceClass: {
      date: "July 12th",
      time: "5:00 PM",
      promoEnd: "July 11th",
      promoPrice: "$20",
      regularPrice: "$25",
      paymentLink: "https://member.life/thewoodlandslatindance/offer/5900",
    },
  });
};
