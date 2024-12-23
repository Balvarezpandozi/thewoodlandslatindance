const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RedirectionSchema = new Schema({
    redirectionID: {type: String, required: true, unique: true},
    locationDescription: { type: String, required: true },
    urlRedirection: { type: String, required: true },
    leads: [{ type: Schema.Types.ObjectId, ref: 'QRCodeLead', required: true }]
});

module.exports = mongoose.model('Redirection', RedirectionSchema);