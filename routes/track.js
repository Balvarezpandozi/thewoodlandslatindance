const express = require("express");
const router = express.Router();
const trackingController = require("../controllers/track");
const { catchAsync } = require("../utils/ErrorHandler");

router.post("/", catchAsync(trackingController.trackPageInteraction));

module.exports = router;
