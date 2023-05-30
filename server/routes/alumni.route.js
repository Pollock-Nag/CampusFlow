const express = require('express');
const router = express.Router();
const alumniController = require('../controllers/alumni.controller');

router.get('/test', alumniController.test);
router.post('/convertToAlumni/', alumniController.convertToAlumni);
router.post('/postInfo/:id', alumniController.postInfo);
router.post('/addSkills/:id', alumniController.addSkills);
router.get('/getAlumniById/:id', alumniController.getAlumniById);
router.delete('/deleteInfo/:id', alumniController.deleteInfo);
router.get('/getAlumniById/:id', alumniController.getAlumniById);
router.post('/addStack/:id', alumniController.addStack);

module.exports = router;
