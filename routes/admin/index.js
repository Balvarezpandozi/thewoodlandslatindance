const express = require("express");
const router = express.Router();
const adminController = require("../../controllers/admin/index");

const { catchAsync } = require("../../utils/ErrorHandler");
const { isLoggedIn } = require("../../services/middleware");

const announcementRoutes = require("./announcement");
const danceClassRoutes = require("./danceClass");
const priceRoutes = require("./price");
const recipientRoutes = require("./recipient");

router.route("/").get(isLoggedIn, catchAsync(adminController.renderDashboard));
router.use("/announcement", announcementRoutes);
router.use("/class", danceClassRoutes);
router.use("/price", priceRoutes);
router.use("/recipients", recipientRoutes);

module.exports = router;
