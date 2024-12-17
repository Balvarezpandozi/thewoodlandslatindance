const ViewLocals = require("../utils/ViewLocals");

module.exports.renderHomepage = async (req, res) => {
    const viewLocals = new ViewLocals({
        scheduleLink: '#schedule-section',
        pricingLink: '#pricing-section',
        faqsLink: '#faqs-section',
        styleFiles: ['mainpage.css']
    });    
    res.render('main/index', {locals: viewLocals});
}