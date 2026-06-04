const PageInteraction = require("../../models/PageInteraction");

module.exports.renderMetrics = async (req, res) => {
  const pageInteractions = await PageInteraction.find();
  res.render("admin/metrics", { pageInteractions: pageInteractions });
};
