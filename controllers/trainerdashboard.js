'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const userStore = require('../models/user-store');
const uuid = require('uuid');

const trainerdashboard = {
  
  index(request, response) {
   
    logger.info('Trainer Dashboard Rendering');
    const assessment = assessmentStore.getAllAssessmentlists();
    const userinfo = userStore.getAllUsers() ;
    const combinedinfo = [];
        for (var i = 0; i < assessment.length; i++) {
              for (var s = 0; s <userinfo.length; s++){
              if (assessment[i].userid === userinfo[s].id) {
              combinedinfo.push({id: assessment[i].id, userid: assessment[i].userid, title: assessment[i].title,
                                 assessmentResults: assessment[i].assessmentResults,firstName: userinfo[i].firstName, 
                                 lastName: userinfo[i].lastName}); 
              break;  
              }
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
    const assessmentlistid = request.params.listid;
    const assessmentid = request.params.id;
    const assessment = assessmentStore.getAssessmentlist(assessmentlistid);
    const newComment = {
      
      comments: request.body.comment
      
    };
    logger.info('updating comment', newComment);
    assessmentStore.addComment(assessmentlistid, assessmentid, newComment); 
    response.redirect(/trainerdashboard/);
  },
  
};

module.exports = trainerdashboard;

