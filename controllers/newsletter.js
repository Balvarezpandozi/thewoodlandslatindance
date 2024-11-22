const Users = require("../models/users");
const ViewLocals = require("../utils/ViewLocals");
const EmailSender = require('../utils/EmailSender');

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
    const mailer = new EmailSender();
    mailer.sendEmail(user.email,{templateName: 'Welcome', firstName: user.firstName});
    res.redirect('/');
}