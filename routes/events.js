const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/events");
const { catchAsync } = require("../utils/ErrorHandler");

router.route("/").get(eventsController.renderEventsFunnel);
router.route("/").post(catchAsync(eventsController.requestQuote));

module.exports = router;
