/**
 * Session
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    adapter: 'redis',
    schema: false,
    attributes: {
        desktop_id: 'int', 
        user_id: 'int',
        token: {
           type: 'string',
	   primaryKey: true
        }
    }
};
