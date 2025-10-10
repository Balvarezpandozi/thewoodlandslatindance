const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const passport = require("passport");
const { catchAsync } = require("../utils/ErrorHandler");

router.route("/login").get(userController.renderLoginForm);
router.route("/login").post(
  (req, res, next) => {
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase().trim();
    }
    next();
  },
  passport.authenticate("local", { failureRedirect: "/auth/login" }),
  userController.loginUser
);
router.route("/logout").get(catchAsync(userController.logout));

module.exports = router;
