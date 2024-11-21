const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletter');
const { catchAsync } = require('../utils/ErrorHandler');

router.route('/')
    .get(newsletterController.renderNewsletterForm);

router.route('/new')
    .post(catchAsync(newsletterController.addUserToNewsletter));
    
module.exports = router;