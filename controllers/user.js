const ViewLocals = require("../utils/ViewLocals");

module.exports.renderLoginForm = async (req, res) => {
  const viewLocals = new ViewLocals({
    pageTitle: "Admin Portal - Login",
  });
  res.render("user/login", { locals: viewLocals });
};

module.exports.loginUser = (req, res) => {
  res.redirect("/adminportal");
};
