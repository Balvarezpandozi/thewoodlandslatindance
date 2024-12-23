const express = require('express');
const router = express.Router();
const qrCodeController = require('../controllers/qrCode');
const { catchAsync } = require('../utils/ErrorHandler');

router.route('/:redirectionID')
    .get(qrCodeController.saveLeadAndRedirect);
    
module.exports = router;