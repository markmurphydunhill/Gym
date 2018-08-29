'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      title: 'Dashboard',
      assessmentCompleted: assessmentStore.getAllAssessments(),
    };
    logger.info('about to render', assessmentStore.getAllAssessments());
    response.render('dashboard', viewData);
  },
};



module.exports = dashboard;
