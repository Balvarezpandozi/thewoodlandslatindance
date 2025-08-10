const express = require("express");
const router = express.Router();
const homepageController = require("../controllers/homepage");
const { catchAsync } = require("../utils/ErrorHandler");

//router.route("/").get(catchAsync(homepageController.renderHomepage));
router.route("/").get(homepageController.renderHomepage);

module.exports = router;
