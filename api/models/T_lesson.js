/**
 * T_lesson
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,
  migrate: 'safe',
  attributes: {
  	
   lesson_id: {
   type: 'integer',
   autoIncrement: true,
   primaryKey: true
   },
   title: {
   type: 'string'
   },
   type: {
   type: 'string',
   required: true
   },
   owner_id: {
   type: 'integer',
   required: true
   },
   privacy: {
   type: 'string'
   },
   next_lesson: {
   type: 'integer'
   },
   file_package: {
   type: 'string'
   },
   worksheet_package: {
   type: 'string'
   },
   owner_org: {
   type: 'integer'
   },
   image_id: {
   type: 'integer'
   }
  }
};
