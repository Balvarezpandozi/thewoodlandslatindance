const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const { catchAsync } = require("../utils/ErrorHandler");
const { isLoggedIn } = require("../services/middleware");

router.route("/").get(isLoggedIn, catchAsync(adminController.renderDashboard));
router
  .route("/announcement/new")
  .get(isLoggedIn, adminController.renderNewAnnouncementForm)
  .post(isLoggedIn, catchAsync(adminController.createAnnouncement));
router
  .route("/announcement/:id")
  .delete(isLoggedIn, catchAsync(adminController.deleteAnnouncement));

module.exports = router;
