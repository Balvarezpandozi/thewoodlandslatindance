const Redirection = require('../models/redirection');
const QRCodeLead = require('../models/qrCodeLead');

module.exports.saveLeadAndRedirect = async (req, res) => {
    const { redirectionID } = req.params;
    const redirection = await Redirection.findOne({ redirectionID: redirectionID });
    
    if(null == redirection) return res.redirect('/');

    const qrCodeLead = new QRCodeLead({
        timestamp: new Date(),
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        referer: req.headers['referer'] || 'Direct',
        browserLanguage: req.headers['accept-language']
    });
    redirection.leads.push(qrCodeLead);

    await qrCodeLead.save();
    await redirection.save();

    res.redirect(redirection.urlRedirection);
}