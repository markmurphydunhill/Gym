'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require('../utils/logger');

const assessmentStore = {

  store: new JsonStore('./models/assessment-store.json', { assessmentCollection: [] }),
  collection: 'assessmentCollection',

   getAllAssessmentlists() {
    return this.store.findAll(this.collection);
  },
  

  getAssessmentlist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserAssessments(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  
  addAssessment(id, assessment) {
    const assessmentlist = this.getAssessmentlist(id);
    logger.info('viewing aalist', assessmentlist);
    assessmentlist.assessmentResults.push(assessment);
    this.store.save();
  },
  
   removeAssessment(id, assessmentId) {
    const assessmentlist = this.getAssessmentlist(id);
    const assessments = assessmentlist.assessmentResults;
    _.remove(assessments, { id: assessmentId});
    this.store.save();
  },
  
    addComment(assessmentlistid, assessmentid, newComment) {
    const assessmentlist = this.getAssessmentlist(assessmentlistid);
    const assessments = assessmentlist.assessmentResults;
     for (var i = 0; i < assessments.length; i++){
      if (assessments[i].id === assessmentid){
        assessments[i].comments = newComment.comments;
          }
      }         
    logger.info(newComment);
    this.store.save();
  },
  
};

module.exports = assessmentStore;
