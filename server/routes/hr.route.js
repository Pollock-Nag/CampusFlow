const express = require('express');
const router = express.Router();
const hrController = require('../controllers/hr.controller');

router.post('/stackWiseFilter', hrController.stackWiseFilter);
router.get('/getMLmatch/:id', hrController.getMLmatch);

module.exports = router;
