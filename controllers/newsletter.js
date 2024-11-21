const Users = require("../models/user");
const ViewLocals = require("../utils/ViewLocals");

module.exports.renderNewsletterForm = (req, res) => {
    const viewLocals = new ViewLocals({
        pageTitle: 'Join Newsletter!',
        styleFiles: ['mainpage.css', 'newsletterForm.css'],
    });
    
    res.render('newsletter/new', {locals: viewLocals});
}

module.exports.addUserToNewsletter = async (req, res) => {
    const user = new Users(req.body.user);
    user.sendNewsletter = true;
    await user.save();
    res.redirect('/');
}