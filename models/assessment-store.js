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
  
/*   removeSong(id, songId) {
    const playlist = this.getPlaylist(id);
    const songs = playlist.songs;
    _.remove(songs, { id: songId});
    this.store.save();
  },

  addPlaylist(playlist) {
    this.store.add(this.collection, playlist);
    this.store.save();
  },

  removePlaylist(id) {
    const playlist = this.getPlaylist(id);
    this.store.remove(this.collection, playlist);
    this.store.save();
  },

  removeAllPlaylists() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addSong(id, song) {
    const playlist = this.getPlaylist(id);
    playlist.songs.push(song);

    let duration = 0;
    for (let i = 0; i < playlist.songs.length; i++) {
      duration += playlist.songs[i].duration;
    }

    playlist.duration = duration;
    this.store.save();
  },

  removeSong(id, songId) {
    const playlist = this.getPlaylist(id);
    const songs = playlist.songs;
    _.remove(songs, { id: songId});
    this.store.save();
  },*/
};

module.exports = assessmentStore;
