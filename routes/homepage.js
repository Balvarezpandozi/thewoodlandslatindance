const express = require("express");
const router = express.Router();
const homepageController = require("../controllers/homepage");
const { catchAsync } = require("../utils/ErrorHandler");

router.route("/").get(catchAsync(homepageController.renderHomepage));
router
  .route("/cancellation-policy")
  .get(homepageController.renderCancellationPolicy);

module.exports = router;
