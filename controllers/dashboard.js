'use strict';

const logger = require('../utils/logger');
const assessmentCollection = require('../models/assessment-store.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      Title: '60000',
      assessmentsCompleted: assessmentCollection,
    };
    logger.info('about to render', assessmentCollection);
    response.render('dashboard', viewData);
  },
};

module.exports = dashboard;
