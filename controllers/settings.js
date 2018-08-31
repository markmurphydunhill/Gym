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
    const viewData = {
      title: loggedInUser,      
      user: userStore.getUserById(loggedInUser.id),
    };
    logger.info('about to render settings', userStore.getUserById(loggedInUser.id));
    response.render('settings', viewData);
  },
  
  updateUser(request, response){
    
    const LoggedInUserId = request.params.userid;
    const user = request.body;
    user.id = LoggedInUserId;
       
    logger.info('updating user', user);
    userStore.updateUser(user); 
    response.redirect('/dashboard/');
  
  } 
 
};

module.exports = settings;
