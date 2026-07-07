const express = require("express");
const router = express.Router();
const metricsController = require("../../controllers/admin/metrics");
const { catchAsync } = require("../../utils/ErrorHandler");
const { isLoggedIn } = require("../../services/middleware");

router
  .route("/")
  .get(isLoggedIn, catchAsync(metricsController.renderMetrics))
  .post(isLoggedIn, catchAsync(metricsController.renderMetricsWithRange));

module.exports = router;
