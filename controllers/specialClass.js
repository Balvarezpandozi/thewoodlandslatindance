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
      date: "June 14th",
      time: "3:00 PM",
      promoEnd: "June 13th",
      promoPrice: "$20",
      regularPrice: "$25",
      paymentLink: "https://member.life/thewoodlandslatindance/offer/5900",
    },
  });
};
