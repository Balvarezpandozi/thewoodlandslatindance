const express = require("express");
const router = express.Router();
const announcementController = require("../../controllers/admin/announcement");
const { catchAsync } = require("../../utils/ErrorHandler");
const { isLoggedIn } = require("../../services/middleware");

router
  .route("/new")
  .get(isLoggedIn, announcementController.renderNewAnnouncementForm)
  .post(isLoggedIn, catchAsync(announcementController.createAnnouncement));
router
  .route("/:id")
  .delete(isLoggedIn, catchAsync(announcementController.deleteAnnouncement));
module.exports = router;
