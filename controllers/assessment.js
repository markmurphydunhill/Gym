'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store.js');
const uuid = require('uuid');

const assessment = {
  index(request, response) {
    const assessmentId = request.params.id;
    logger.debug('Assessment id = ', assessmentId);
    const viewData = {
      title: 'Assessment List???',
      assessmentDetails: assessmentStore.getAssessment(assessmentId),
    };
    response.render('assessmentlist', viewData);
  },
  
  
 deleteAssessment(request, response) {
    const assessmentlistId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting Assessment ${assessmentId} from AssessmentList ${assessmentlistId}`);
    assessmentStore.removeAssessment(assessmentlistId, assessmentId);
    response.redirect('/assessment/' + assessmentlistId);
  
  },
  
 addAssessment(request, response) {
    const assessmentlistId = request.params.id;
    const assessment = assessmentStore.getAssessment(assessmentlistId);
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
    assessmentStore.addAssessment(assessmentlistId, newAssessment);
    response.redirect('/assessment/' + assessmentlistId);
  },

 
};

module.exports = assessment;