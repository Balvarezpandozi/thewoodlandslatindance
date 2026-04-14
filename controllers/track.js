const PageInteraction = require("../models/PageInteraction");

module.exports.trackPageInteraction = async (req, res) => {
  const { url, type, visitorId } = JSON.parse(req.body);

  const pageInteraction = new PageInteraction({
    url: url,
    timestamp: new Date(),
    type: type,
    visitorId: visitorId,
  });
  pageInteraction.save().catch((err) => {
    console.error("Error tracking page view:", err);
  });
  res.sendStatus(200);
};
