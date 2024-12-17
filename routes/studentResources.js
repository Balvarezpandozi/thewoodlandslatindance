const express = require('express');
const router = express.Router();
const studentResourcesController = require('../controllers/studentResources');

router.route('/')
    .get(studentResourcesController.renderStudentResources);
    
router.route('/salsaplaylist')
    .get(studentResourcesController.renderSalsaPlaylistInfo);

router.route('/bachataplaylist')
    .get(studentResourcesController.renderBachataPlaylistInfo);
module.exports = router;