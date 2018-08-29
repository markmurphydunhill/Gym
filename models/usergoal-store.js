'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require('../utils/logger');

const goalStore = {

  store: new JsonStore('./models/usergoal-store.json', { goalCollection: [] }),
  collection: 'goalCollection',


  
    getGoallist(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
  
  addGoal(id, newGoal) {
    const goallist = this.getGoallist(id);
    const goallist0 = goallist[0];
    logger.info('marks goals', goallist0);
    goallist0.goals.push(newGoal);
    this.store.save();
  }
  
  

  
};

module.exports = goalStore;
