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
  .get(isLoggedIn, catchAsync(priceController.renderPrice))
  .put(isLoggedIn, catchAsync(priceController.editPrice))
  .delete(isLoggedIn, catchAsync(priceController.deletePrice));
router
  .route("/edit/:id")
  .get(isLoggedIn, catchAsync(priceController.renderEditPriceForm));
module.exports = router;
