'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const userStore = require('../models/user-store');

const uuid = require('uuid');

const settings = {
  index(request, response) {
    logger.info('settings rendering');
    const loggedInUser = accounts.getCurrentUser(request);
   // const loggedInUserName = accounts.getUserNameById
    const viewData = {
      title: loggedInUser,      
      user: userStore.getUserById(loggedInUser.id),
    };
    logger.info('about to render settings', userStore.getUserById(loggedInUser.id));
    response.render('settings', viewData);
  }
  
 
};

module.exports = settings;
