'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const assessmentStore = {

  store: new JsonStore('./models/assessment-store.json', { assessmentCollection: [] }),
  collection: 'assessmentCollection',

  getAllAssessments() {
    return this.store.findAll(this.collection);
  },

  getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

 // addPlaylist(playlist) {
 //   this.store.add(this.collection, playlist);
 //   this.store.save();
 // },

  //removePlaylist(id) {
  //  const playlist = this.getPlaylist(id);
  //  this.store.remove(this.collection, playlist);
  //  this.store.save();
  //},

  //removeAllPlaylists() {
  //  this.store.removeAll(this.collection);
  //  this.store.save();
  //},
  
  /*  addSong(id, song) {
    const playlist = this.getPlaylist(id);
    playlist.songs.push(song);
    this.store.save();
  },
*/

  addAssessment(id, assessment) {
    const assessmentlist = this.getAssessment(id);
    assessmentlist.assessmentResults.push(assessment);
    this.store.save();
  },

  /*removeSong(id, songId) {
    const playlist = this.getPlaylist(id);
    const songs = playlist.songs;
    _.remove(songs, { id: songId});
    this.store.save();
  },*/
  
    removeAssessment(id, assessmentId) {
    const assessmentList = this.getAssessment(id);
    const assessment = assessmentList.assessmentResults;
    _.remove(assessment, { id: assessmentId});
    this.store.save();
  },
};

module.exports = assessmentStore;
