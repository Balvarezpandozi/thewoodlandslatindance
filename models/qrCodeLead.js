const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QRCodeLeadSchema = new Schema({
    timestamp: { type: Date, required: true },
    ipAddress: { type: String },
    userAgent: { type: String },
    referer: { type: String },
    browserLanguage: { type: String }
});

module.exports = mongoose.model('QRCodeLead', QRCodeLeadSchema);