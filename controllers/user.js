const ViewLocals = require("../utils/ViewLocals");

module.exports.renderLoginForm = (req, res) => {
  if (req.user) return res.redirect("/adminportal");
  const viewLocals = new ViewLocals({
    pageTitle: "Admin Portal - Login",
  });
  res.render("user/login", { locals: viewLocals });
};

module.exports.loginUser = (req, res) => {
  res.redirect("/adminportal");
};

module.exports.logout = async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.redirect("/");
  });
};
