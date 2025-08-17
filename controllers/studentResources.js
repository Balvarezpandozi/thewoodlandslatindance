const ViewLocals = require("../utils/ViewLocals");

module.exports.renderStudentResources = async (req, res) => {
  const viewLocals = new ViewLocals({
    styleFiles: ["studentResources.css"],
    canonicalTag: "studentResources",
    pageTitle: "The Woodlands Latin Dance - Student Resources",
  });
  res.render("studentResources/index", { locals: viewLocals });
};

module.exports.renderSalsaPlaylistInfo = async (req, res) => {
  const viewLocals = new ViewLocals({
    styleFiles: ["studentResources.css"],
    canonicalTag: "studentResources/salsaPlaylist",
    pageTitle: "The Woodlands Latin Dance - Salsa Playlist",
  });
  res.render("studentResources/salsaPlaylist", { locals: viewLocals });
};

module.exports.renderBachataPlaylistInfo = async (req, res) => {
  const viewLocals = new ViewLocals({
    styleFiles: ["studentResources.css"],
    canonicalTag: "studentResources/bachataPlaylist",
    pageTitle: "The Woodlands Latin Dance - Bachata Playlist",
  });
  res.render("studentResources/bachataPlaylist", { locals: viewLocals });
};
