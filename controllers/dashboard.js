'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const userStore = require('../models/user-store');
const analytics = require('./analytics.js');
const goalStore = require('../models/usergoal-store');


const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const loggedInUserId = loggedInUser.id;
    const bmi = analytics.getBmi(loggedInUserId);
    const goalstatus = analytics.getGoalStatus(loggedInUserId);     
    const trend = analytics.getTrend(loggedInUserId);
    const viewData = {
      title: loggedInUser,      
      assessmentlist: assessmentStore.getUserAssessments(loggedInUser.id),
      bmi:  bmi,
      goalstatus: goalstatus,
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
      date:  request.body.date,
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
  
      addGoal(request, response) {
    const loggedinuser = request.params.userid;
    const newGoal = {
    
      goaldate:  request.body.goaldate,
      id: uuid(),
      goalweight: request.body.goalweight,
      goalchest: request.body.goalchest,
     
    };
    logger.debug('New Goal = ', newGoal);
    goalStore.addGoal(loggedinuser, newGoal);
    response.redirect('/dashboard/');
  },
  
};

module.exports = dashboard;
