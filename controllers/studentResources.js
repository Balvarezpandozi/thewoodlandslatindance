const ViewLocals = require("../utils/ViewLocals");

module.exports.renderStudentResources = async (req, res) => {
    const viewLocals = new ViewLocals({
        styleFiles: ['studentResources.css']
    });
    res.render('studentResources/index', {locals: viewLocals});
}

module.exports.renderSalsaPlaylistInfo = async (req, res) => {
    const viewLocals = new ViewLocals({
        styleFiles: ['studentResources.css']
    });
    res.render('studentResources/salsaPlaylist', {locals: viewLocals});
}

module.exports.renderBachataPlaylistInfo = async (req, res) => {
    const viewLocals = new ViewLocals({
        styleFiles: ['studentResources.css']
    });
    res.render('studentResources/bachataPlaylist', {locals: viewLocals});
}