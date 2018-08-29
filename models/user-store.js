'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require('../utils/logger');

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  addUser(user) {
    this.store.add(this.collection, user);
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
  updateUser(user) {
    const loggedInUser = user.id;
    
    const olduserdetails = this.getUserById(loggedInUser);
    logger.info('old', olduserdetails);
    const newuserdetails = user;
    logger.info('new', newuserdetails);
          olduserdetails.firstName = newuserdetails.firstName;  
          olduserdetails.lastName = newuserdetails.lastName; 
          olduserdetails.email = newuserdetails.email; 
          olduserdetails.password = newuserdetails.password; 
          olduserdetails.gender = newuserdetails.gender; 
          olduserdetails.height = newuserdetails.height; 
          olduserdetails.startweight = newuserdetails.startweight; 
    logger.info('updated',newuserdetails);
    this.store.save();
  },
  
  

  
};

module.exports = userStore;
