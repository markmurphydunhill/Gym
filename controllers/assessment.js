'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store.js');

const assessment = {
  index(request, response) {
    const assessmentId = request.params.id;
    logger.debug('Assessment id = ', assessmentId);
    const viewData = {
      title: 'Assessment List',
      assessmentDetails: assessmentStore.getAssessment(assessmentId),
    };
    response.render('assessmentlist', viewData);
  },

 
};

module.exports = assessment;