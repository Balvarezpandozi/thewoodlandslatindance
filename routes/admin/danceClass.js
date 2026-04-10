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
  .get(isLoggedIn, catchAsync(danceClassController.renderDanceClass))
  .put(isLoggedIn, catchAsync(danceClassController.editClass))
  .delete(isLoggedIn, catchAsync(danceClassController.deleteClass));
router
  .route("/edit/:id")
  .get(isLoggedIn, catchAsync(danceClassController.renderEditClassForm));
module.exports = router;
