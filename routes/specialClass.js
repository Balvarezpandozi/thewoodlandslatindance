const express = require("express");
const router = express.Router();
const specialClassController = require("../controllers/specialClass");
const { catchAsync } = require("../utils/ErrorHandler");

router.route("/").get(specialClassController.renderBachataCrashCourse);

module.exports = router;
