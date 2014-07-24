/**
 * User
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
schema: true,
migrate: 'safe',
  attributes: {
  	
   user_id: {
    type: 'integer',
    autoIncrement: true,
    primaryKey: true
   },
   username: {
    type: 'string',
   },
   password: {
    type: 'string',
   },
   email: {
    type: 'string',
    email: true,
    unique: true
   },
   forename: {
    type: 'string',
    required: true
   },
   surname: {
    type: 'string',
    required: true
   },
   org_id: {
   type: 'integer'
   },
   student_li_id: {
   type: 'integer'
   },
   toJSON: function() {
    var obj = this.toObject();
    delete obj.password;
    delete obj.confirmation;
    delete obj.encryptedPassword;
    delete obj._csrf;
     return obj;
    }
  },
  beforeValidation: function (values, next) {
    if (typeof values.admin !== 'undefined') {
      if (values.admin === 'unchecked') {
        values.admin = false;
      } else if (values.admin[1] === 'on') {
        values.admin = true;
      }
    }
     next();
  },
//   beforeCreate: function (values, next) {
//
    // This checks to make sure the password and password confirmation match before creating record
//    if (!values.password || values.password != values.confirmation) {
//      return next({err: ["Password doesn't match password confirmation."]});
//    }
//
//    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
//      if (err) return next(err);
//      values.encryptedPassword = encryptedPassword;
      // values.online= true;
//      next();
//    });
//  }
};
