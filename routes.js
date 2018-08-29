'use strict';

const express = require('express');
const router = express.Router();

const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const assessment = require('./controllers/assessment.js');

router.get('/', dashboard.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/assessment/:id', assessment.index);
router.get('/assessment/:id/deleteAssessment/:assessmentid', assessment.deleteAssessment);
router.post('/assessment/:id/addassessment', assessment.addAssessment);


module.exports = router;
