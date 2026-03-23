const express = require("express");
const router = express.Router();
const priceController = require("../../controllers/admin/price");
const { catchAsync } = require("../../utils/ErrorHandler");
const { isLoggedIn } = require("../../services/middleware");

router
  .route("/new")
  .get(isLoggedIn, priceController.renderNewPriceForm)
  .post(isLoggedIn, catchAsync(priceController.createPrice));
router
  .route("/:id")
  .delete(isLoggedIn, catchAsync(priceController.deletePrice));
module.exports = router;
