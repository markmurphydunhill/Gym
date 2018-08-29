'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const userStore = require('../models/user-store');
const uuid = require('uuid');

const trainerdashboard = {
  
  index(request, response) {
    //const playlistId = request.params.id;
    logger.info('Trainer Dashboard Rendering');
    const assessment = assessmentStore.getAllAssessmentlists();
    const userinfo = userStore.getAllUsers() ;
    const combinedinfo = [];
        for (var i = 0; i < assessment.length; i++) {
            if (assessment[i].userid === userinfo[i].id) {
      combinedinfo.push({id: assessment[i].id, userid: assessment[i].userid, title: assessment[i].title,
                         assessmentResults: assessment[i].assessmentResults,firstName: userinfo[i].firstName, 
                         lastName: userinfo[i].lastName});    
              }
            }   
       
    const viewData = {
       title: 'Assessment Lists',
       assessmentlist: combinedinfo,
    };
    logger.info(combinedinfo),
    response.render('trainerDashboard', viewData);
  },
  
   indexlist(request, response) {
    const assessmentlistId = request.params.id;
    const userid = request.params.userid; 
    logger.info('Assessment Detail Trainer Dashboard Rendering');
    const viewData = {
      title: userStore.getUserById(userid),
      assessmentlist: assessmentStore.getAssessmentlist(assessmentlistId) ,
    };
     logger.info('about to render', assessmentStore.getAssessmentlist(assessmentlistId)),
    response.render('trainerassessmentlist', viewData);
  },
  
  addComment(request, response) {
    const assessmentid = request.params.listid;
    const assessment = assessmentStore.getAssessmentlist(assessmentlistId);
    const newSong = {
      id: uuid(),
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration),
    };
    logger.debug('New Song = ', newSong);
    playlistStore.addSong(playlistId, newSong);
    response.redirect('/playlist/' + playlistId);
  },
  
  /*
    addSong(request, response) {
    const playlistId = request.params.id;
    const playlist = playlistStore.getPlaylist(playlistId);
    const newSong = {
      id: uuid(),
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration),
    };
    logger.debug('New Song = ', newSong);
    playlistStore.addSong(playlistId, newSong);
    response.redirect('/playlist/' + playlistId);
  },

  deleteSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug(`Deleting Song ${songId} from Playlist ${playlistId}`);
    playlistStore.removeSong(playlistId, songId);
    response.redirect('/playlist/' + playlistId);
  },

*/
};

module.exports = trainerdashboard;

