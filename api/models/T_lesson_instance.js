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

   li_id: {
   type: 'integer',
   autoIncrement: true,
   primaryKey: true
   },
   class_id: {
   type: 'integer',
   required: 'true'
   },
   lesson_id: {
   type: 'integer',
   required: 'true'
   },
   sec_word: {
   type: 'string'
   },
   sec_number: {
   type: 'integer'
   },
   started: {
   // type: 'string'
   },
   finished: {
   // type: 'string'
   },
   lesson_desc: {
   type: 'string'
   },
   type: {
   type: 'string'
   },
   state: {
   type: 'string'
   },
   image_id: {
   type: 'integer'
   }
 }

};
