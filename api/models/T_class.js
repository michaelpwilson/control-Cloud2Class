/**
 * T_class
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,
  migrate: 'safe',
  attributes: {
  	
   class_id: {
    type: 'integer',
    autoIncrement: true,
    primaryKey: true
   },  
   console_sec_group: {
    type: 'string'
   },
   owner_org_id: {
    type: 'integer'
   }
  }

};
