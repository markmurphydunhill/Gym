'use strict';

const express = require('express');
const router = express.Router();

const accounts = require('./controllers/accounts.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const settings = require('./controllers/settings.js');
const trainerdashboard = require('./controllers/trainerdashboard.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/trainerlogin', accounts.trainerlogin);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.post('/trainerAuthenticate', accounts.trainerAuthenticate);
router.get('/dashboard', dashboard.index);
router.get('/trainerdashboard', trainerdashboard.index);

router.get('/assessment/:id/deleteAssessment/:assessmentid', dashboard.deleteAssessment);
router.post('/assessment/:id/addassessment', dashboard.addAssessment);

router.get('/assessmentlist/:id/user/:userid', trainerdashboard.indexlist);
router.post('/assessmentlist/:listid/addcomment/:id', trainerdashboard.addComment);

router.get('/settings', settings.index);
router.post('/settings/update/:userid', settings.updateUser);



//router.get('/dashboard/deleteplaylist/:id', dashboard.deletePlaylist);
//router.post('/dashboard/addplaylist', dashboard.addPlaylist);

//router.get('/about', about.index);
//router.get('/playlist/:id', playlist.index);



module.exports = router;
