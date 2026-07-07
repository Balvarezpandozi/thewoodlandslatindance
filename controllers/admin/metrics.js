const PageInteraction = require("../../models/PageInteraction");

module.exports.renderMetrics = async (req, res) => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const pageInteractions = await PageInteraction.find({
    timestamp: { $gte: oneMonthAgo },
  });
  res.render("admin/metrics", { pageInteractions: pageInteractions });
};

module.exports.renderMetricsWithRange = async (req, res) => {
  const { fromDate, toDate } = req.body;
  const start = fromDate ? new Date(fromDate) : new Date(0);
  const end = toDate ? new Date(toDate) : new Date();
  const filter = { $gte: start, $lte: end };

  const pageInteractions = await PageInteraction.find({
    timestamp: filter,
  });

  res.render("admin/metrics", { pageInteractions: pageInteractions });
};
