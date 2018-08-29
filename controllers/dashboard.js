'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const userStore = require('../models/user-store');

const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
   // const loggedInUserName = accounts.getUserNameById
    const viewData = {
      title: loggedInUser,      
      assessmentlist: assessmentStore.getUserAssessments(loggedInUser.id),
    };
    logger.info('about to render', assessmentStore.getUserAssessments(loggedInUser.id));
    response.render('dashboard', viewData);
  },
  
   deleteAssessment(request, response) {
    const id = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting Assessment ${assessmentId}`);
    assessmentStore.removeAssessment(id, assessmentId);
    response.redirect('/dashboard/');
  },
  
    addAssessment(request, response) {
    const assessmentId = request.params.id;
    const assessment = assessmentStore.getAssessmentlist(assessmentId);
    const newAssessment = {
      id: uuid(),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperarm: request.body.upperarm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    logger.debug('New Assessment = ', newAssessment);
    assessmentStore.addAssessment (assessmentId, newAssessment);
    response.redirect('/dashboard/');
  },
  
   /*addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newAssessment = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      songs: [],
    };
    logger.debug('Creating a new Playlist', newPlayList);
    playlistStore.addPlaylist(newPlayList);
    response.redirect('/dashboard');*/

  /*deletePlaylist(request, response) {
    const playlistId = request.params.id;
    logger.debug(`Deleting Playlist ${playlistId}`);
    playlistStore.removePlaylist(playlistId);
    response.redirect('/dashboard');
  },

  addPlaylist(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newPlayList = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      songs: [],
    };
    logger.debug('Creating a new Playlist', newPlayList);
    playlistStore.addPlaylist(newPlayList);
    response.redirect('/dashboard');
  },*/
};

module.exports = dashboard;
