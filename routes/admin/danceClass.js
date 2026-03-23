const express = require("express");
const router = express.Router();
const danceClassController = require("../../controllers/admin/danceClass");
const { catchAsync } = require("../../utils/ErrorHandler");
const { isLoggedIn } = require("../../services/middleware");

router
  .route("/new")
  .get(isLoggedIn, danceClassController.renderNewClassForm)
  .post(isLoggedIn, catchAsync(danceClassController.createClass));
router
  .route("/:id")
  .delete(isLoggedIn, catchAsync(danceClassController.deleteClass));
module.exports = router;
