'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const userStore = require('../models/user-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const analytics = {
  
  getBmi(id) {
    //const playlistId = request.params.id;
    logger.info('Calculating BMI');
    const assessments = assessmentStore.getUserAssessments(id);
    const assessment = assessments[0].assessmentResults;
    const userinfo = userStore.getUserById(id) ;
    logger.info('ass', assessment);
    logger.info('len', assessment.lenght);
    logger.info('user', userinfo.height);
    let bmi = ((assessment[assessment.length-1].weight)  / (userinfo.height * userinfo.height) );
    bmi = Math.round(bmi * 100)/100.0;
    
    //[assessment.length - 1]
     /*  
    if (assessment.length >= 1){
    var bmi = ((assessment[assessment.length - 1].weight)  / (userinfo.height * userinfo.height) );
    //
    logger.info(bmi);
    return bmi; };
  }; */
    return bmi;  

  }
  
   
};

module.exports = analytics;
