/**
 * T_desktop
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,
  migrate: 'safe',
  attributes: {
    desktop_id: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
    owner_id: {
      type: 'integer',
      required: true
    },
    comment: {
      type: 'string'
    },
    owning_li_id: {
      type: 'integer'
    },
    version: {
      type: 'string'
    },
    tag: {
      type: 'string'
    },
    image_id: {
      type: 'integer',
      // required: true
    },
  }
};
