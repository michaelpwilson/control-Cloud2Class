/**
 * SessionController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var bcrypt = require('bcrypt');

module.exports = {
    
'quick': function (req, res){
var randtoken = require('rand-token').generator();
 String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
 }
  if(req.session.User){
    res.redirect('/control');
  } else {
    if (!req.param('forename') || !req.param('surname') || !req.param('lcode1') || !req.param('lcode2')) {
      var AllFieldsNeededInQuickLogin = [{
        name: 'AllFieldsNeededInQuickLogin',
        message: 'All fields need to be completed for quick login'
      }]
    req.session.flash = {
    err: AllFieldsNeededInQuickLogin
    }
    res.redirect('/');
    return;
    }
    T_lesson_instance.findOne().where({  or: [{ sec_word: req.param('lcode1') }, { sec_number: req.param('lcode2') }] }).done(function (err, response) {       // If we cant find a lesson instance
       if(err) {
          var DidntFindYou = [{
             name: 'DidntFindYou',
             message: 'We couldnt find you with them creditials'
          }]
      req.session.flash = {
       err: DidntFindYou
      }
      res.redirect('/');
      return;
    }   
    // We found your lesson instance id!
    li_id = response.li_id;
    // now the lesson id
    lesson_id = response.lesson_id;
      // Lets find the owner_org of this using the lesson id
    T_lesson.findOne().where({lesson_id: lesson_id}).done(function (err, getOrg) {
         // If we cant find an organisation
         if (err) return next(err);
         // org_id
          org_id = getOrg.owner_org;
	  // Now we try to match a user with the same forename, surname and org_id
          T_user.count().where({org_id: org_id}).where({forename: req.param('forename').capitalize()}).where({surname: req.param('surname').capitalize()}).done(function (err, getUser) {
            if (err) return next(err);
            // Generate a 32 character token:
            token = randtoken.generate(32);
             if(!getUser) {
               // Create a new user for this person
               T_user.create({
                  forename: req.param('forename'),
                  surname: req.param('surname'),
                  org_id: org_id,
                  student_li_id: li_id
               }).done(function (err, newUser) {
                  console.log(err);
                  req.session.authenticated = true;
                  req.session.User = getUser;
                  user_id = req.session.User.user_id;
                    T_desktop.findOne().where({owner_id: user_id}).done(function (err, getDesktop) {
                        // getUser.online = true;
                        // Set the owning li
                        T_desktop.update({
                         owning_li_id: li_id,
                        }, function(err, updatedDesktop) {
                        // Error handling
                        if (err) {
                        return console.log(err);
                        // Updated users successfully!
                        } else {
                        console.log("desktop updated:", updatedDesktop);
                        }
                        });
                        /*
                        getDesktop.owning_li_id = li_id;
                        getDesktop.save(function(err) {
                          // owning_li_id has been saved with the li_id we found earlier...
                          if (err) return next(err);
                        });
                        */
                        // write the session to Redis DB
                        Session.create({
                          user_id: req.session.User.user_id,
                          token: token
                        }).done(function (err, sessions) {
                          console.log(sessions);
                        });
                        res.redirect('https://dev.cloud2class.com/desk/index.php?token=' + token);
                    });
               });
             } else {
              // Log user in
              req.session.authenticated = true;
              req.session.User = getUser;
              // getUser.online = true;
              user_id = req.session.User.user_id;
          T_desktop.findOne().where({owner_id: user_id}).done(function (err, getDesktop) {
                  T_desktop.update({
                    owning_li_id: li_id,
                  }, function(err, updatedDesktop) {
                  // Error handling
                  if (err) {
                  return console.log(err);
                  // Updated users successfully!
                  } else {
                  console.log("desktop updated:", updatedDesktop);
                  }
                  });
		  // write the session to Redis DB
                  Session.create({
                    user_id: user_id,
                    token: token
                  }).done(function (err, sessions) {
	            console.log(sessions);
                  });
               res.redirect('https://dev.cloud2class.com/desk/index.php?token=' + token);
             });
          }
          });
      });
    });
  }
},

'new': function(req, res) {
if(req.session.User){
res.redirect('/control');
} else {
res.view('session/new');
}
},

create: function(req, res, next) {

// Check for email and password in params sent via the form, if none
// redirect the browser back to the sign-in form.
if (!req.param('username') || !req.param('password')) {
// return next({err: ["Password doesn't match password confirmation."]});

var usernamePasswordRequiredError = [{
name: 'usernamePasswordRequired',
message: 'You must enter both a username and password.'
}]

// Remember that err is the object being passed down (a.k.a. flash.err), whose value is another object with
// the key of usernamePasswordRequiredError
req.session.flash = {
err: usernamePasswordRequiredError
}

res.redirect('/');
return;
}

// Try to find the user by there email address.
// findOneByEmail() is a dynamic finder in that it searches the model by a particular attribute.
// User.findOneByEmail(req.param('email')).done(function(err, user) {
T_user.findOneByUsername(req.param('username'), function foundUser(err, user) {
if (err) return next(err);
// If no user is found...
if (!user) {
var noAccountError = [{
name: 'noAccount',
message: 'The username ' + req.param('username') + ' has not been found.'
}]
req.session.flash = {
err: noAccountError
}
res.redirect('/');
return;
}
bcrypt.compare(req.param('password'), user.password, function(err, valid) {
if (err) return next(err);

// If the password from the form doesn't match the password from the database...
if (!valid) {
var usernamePasswordMismatchError = [{
name: 'usernamePasswordMismatch',
message: 'Invalid username and password combination.'
}]
req.session.flash = {
err: usernamePasswordMismatchError
}
res.redirect('/');
return;
}

// Log user in
req.session.authenticated = true;
req.session.User = user;

// Change status to online
user.online = true;
user.save(function(err, user) {
if (err) return next(err);

// Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
T_user.publishUpdate(user.user_id, {
loggedIn: true,
id: user.user_id,
name: user.forname + user.surname,
action: ' has logged in.'
});

// If the user is also an admin redirect to the user list (e.g. /views/user/index.ejs)
// This is used in conjunction with config/policies.js file
// if (req.session.User.admin) {
// res.redirect('/user');
// return;
// }
res.redirect('/control');
});
});
});
},

destroy: function(req, res, next) {
var userId = req.session.User.user_id;
// Wipe out the session (log out)
req.session.destroy();
// Redirect the browser to the sign-in screen
res.redirect('/');
}
  
};
