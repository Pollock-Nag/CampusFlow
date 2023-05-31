const express = require('express');
const router = express.Router();
const hrController = require('../controllers/hr.controller');
const talentRequest = require('../controllers/mailer');

router.post('/talentRequest', talentRequest);
router.post('/stackWiseFilter', hrController.stackWiseFilter);
router.get('/getMLmatch/:id', hrController.getMLmatch);

module.exports = router;
