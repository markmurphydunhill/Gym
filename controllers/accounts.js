'use strict';

const userstore = require('../models/user-store');
const trainerstore = require('../models/trainer-store');

const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service as User',
    };
    response.render('login', viewData);
  },
  
  trainerlogin(request, response) {
    const viewData = {
      title: 'Login to the Service as Trainer',
    };
    response.render('trainerlogin', viewData);
  },

  logout(request, response) {
    response.cookie('playlist', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie('playlist', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/dashboard');
    } else {
      response.redirect('/login');
    }
  },
  
  trainerAuthenticate  (request, response) {
    const trainer = trainerstore.getTrainerByEmail(request.body.email);
    if (trainer) {
      response.cookie('playlist', trainer.email);
      logger.info(`logging in ${trainer.email}`);
      response.redirect('/trainerDashboard');
    } else {
      response.redirect('/trainerlogin');
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.playlist;
    return userstore.getUserByEmail(userEmail);
  },
  
    trainerAuthenticate(request, response) {
    const trainer = trainerstore.getTrainerByEmail(request.body.email);
    if (trainer) {
      response.cookie('playlist', trainer.email);
      logger.info(`logging in ${trainer.email}`);
      response.redirect('/trainerdashboard');
    } else {
      response.redirect('/login');
    }
         
  },
  
  
};

module.exports = accounts;
