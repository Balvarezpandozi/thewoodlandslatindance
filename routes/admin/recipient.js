const express = require("express");
const router = express.Router();
const recipientController = require("../../controllers/admin/recipient");
const { catchAsync } = require("../../utils/ErrorHandler");
const { isLoggedIn } = require("../../services/middleware");

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

router
  .route("/")
  .get(isLoggedIn, catchAsync(recipientController.renderAllRecipients))
  .post(
    isLoggedIn,
    upload.single("csvFile"),
    catchAsync(recipientController.uploadRecipientsCSV),
  )
  .put(isLoggedIn, catchAsync(recipientController.updateRecipientSubscription));
router
  .route("/getAllRecipients")
  .get(isLoggedIn, catchAsync(recipientController.getAllRecipients));
module.exports = router;
