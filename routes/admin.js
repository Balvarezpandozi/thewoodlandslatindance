const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const { catchAsync } = require("../utils/ErrorHandler");
const { isLoggedIn } = require("../services/middleware");

const multer = require("multer");
const path = require("path");

// Configure multer storage (temporary or permanent)
const upload = multer({
  dest: path.join(__dirname, "../uploads/"), // folder for uploaded files
  limits: { fileSize: 5 * 1024 * 1024 }, // limit 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv" || file.originalname.endsWith(".csv")) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV files are allowed!"), false);
    }
  },
});

router.route("/").get(isLoggedIn, catchAsync(adminController.renderDashboard));
router
  .route("/announcement/new")
  .get(isLoggedIn, adminController.renderNewAnnouncementForm)
  .post(isLoggedIn, catchAsync(adminController.createAnnouncement));
router
  .route("/announcement/:id")
  .delete(isLoggedIn, catchAsync(adminController.deleteAnnouncement));
router
  .route("/class/new")
  .get(isLoggedIn, adminController.renderNewClassForm)
  .post(isLoggedIn, catchAsync(adminController.createClass));
router
  .route("/class/:id")
  .delete(isLoggedIn, catchAsync(adminController.deleteClass));
router
  .route("/price/new")
  .get(isLoggedIn, adminController.renderNewPriceForm)
  .post(isLoggedIn, catchAsync(adminController.createPrice));
router
  .route("/price/:id")
  .delete(isLoggedIn, catchAsync(adminController.deletePrice));
router
  .route("/recipients")
  .get(isLoggedIn, catchAsync(adminController.renderAllRecipients))
  .post(
    isLoggedIn,
    upload.single("csvFile"),
    catchAsync(adminController.uploadRecipientsCSV)
  )
  .put(isLoggedIn, catchAsync(adminController.updateRecipientSubscription));
router
  .route("/getAllRecipients")
  .get(isLoggedIn, catchAsync(adminController.getAllRecipients));
module.exports = router;
