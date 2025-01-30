const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const { catchAsync } = require("../utils/ErrorHandler");

router.route("/").get(catchAsync(adminController.renderDashboard));
router
  .route("/announcement/new")
  .get(adminController.renderNewAnnouncementForm)
  .post(catchAsync(adminController.createAnnouncement));
router
  .route("/announcement/:id")
  .delete(catchAsync(adminController.deleteAnnouncement));

module.exports = router;
