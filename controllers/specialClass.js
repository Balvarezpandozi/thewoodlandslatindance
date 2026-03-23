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

  const pageInteraction = new PageInteraction({
    url: "https://thewoodlandslatindance.com/bachata-crashcourse",
    timestamp: new Date(),
    type: "view",
  });
  pageInteraction.save().catch((err) => {
    console.error("Error tracking page view:", err);
  });

  res.render("events/specialClass", {
    locals: viewLocals,
  });
};
