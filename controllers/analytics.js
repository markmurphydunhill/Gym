'use strict';

const logger = require('../utils/logger');
const assessmentStore = require('../models/assessment-store');
const userStore = require('../models/user-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');
const goalStore = require('../models/usergoal-store');

const analytics = {
  
  getBmi(id) {
    //const playlistId = request.params.id;
    logger.info('Calculating BMI');
    const assessments = assessmentStore.getUserAssessments(id);
    const assessment = assessments[0].assessmentResults;
    const userinfo = userStore.getUserById(id) ;
    let bmi = ((assessment[assessment.length-1].weight)  / (userinfo.height * userinfo.height) );
    bmi = Math.round(bmi * 100)/100.0;
    
    return bmi;  

  },
  
  getGoalStatus(id){
    logger.info('Determinging Goal Status');
    const assessments = assessmentStore.getUserAssessments(id);
    const assessment = assessments[0].assessmentResults;
    const latestassessment = assessment[assessment.length-1];
    
    const usersgoallist = goalStore.getGoallist(id);
    const goallist = usersgoallist[0].goals;
    const latestgoal = goallist[goallist.length-1];
    //logger.info('Last Assessment',latestassessment);
    
    let goalstatus = '';
    
    //const goalstatus;
      if (latestgoal.goaldate > latestassessment.date){
        goalstatus = 'Open';
      }
      else if ((latestgoal.goalweight >latestassessment.weight) && (latestgoal.goalchest >latestassessment.chest ) ){ 
        
        goalstatus = 'Achieved - Well Done!';
      }
      else {goalstatus = 'Goal Missed'};  
    
    return goalstatus;
    
},
  
  getTrend(id){
    const assessments = assessmentStore.getUserAssessments(id);
    const assessment = assessments[0].assessmentResults;
       
    let trend = true;
   
    //assessment[0].trend = trend;
    
  if (assessment.length > 1) {
        assessment[0].trend = trend;
      for (var i = 1; i < assessment.length; i++) {
          let trend = true;
          if(assessment[i].weight > assessment[i-1].weight){
               trend = false;
               assessment[i].trend = trend; 
             } 
          else
           assessment[i].trend = trend;            
      }
  
       //logger.info('trend',assessment);   
      return assessment;
             
   }   
    
    
  
  }
  
   
};

module.exports = analytics;
