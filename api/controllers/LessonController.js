/**
 * LessonController
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

module.exports = {
  
   index: function(req, res) {
if(req.session.User) {
   T_lesson.find({ or: [{owner_org: req.session.User.org_id}, {privacy: 'public'}] }).done(function(err, lessons) {
	    res.view({
             instances: lessons
            });
           });
   } else {
   res.redirect("/");
   }
   }, 

   /**
   * Action blueprints:
   *    `/lesson/start`
   */
   start: function (req, res) {

    var lessonObj = {
    lesson_id: req.param('lesson_id'),
    lesson_type: req.param('lesson_type'),
    class_id: req.param('class_id')
    }

    T_lesson_instance.create(lessonObj, function lessonCreated(err, user) {
      // // If there's an error
      // if (err) return next(err);
  if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        // If error redirect back to sign-up page
        return res.redirect();
      }
     });
   },


  /**
   * Action blueprints:
   *    `/lesson/add`
   */
 add: function (req, res) {
  var lessonObj = {
    lesson_id: req.param('lesson_id'),
    lesson_type: req.param('lesson_type'),
    class_id: req.param('class_id')
  }
   T_lesson_instance.create({
     class_id: lessonObj.class_id,
     lesson_id: lessonObj.lesson_id,
     type: lessonObj.lesson_type
   }).done(function(err, instance) {
     if (err) {
       return console.log(err);
     } else {
       console.log("instance created:", instance);
     }
   });
 },


  /**
   * Action blueprints:
   *    `/lesson/stop`
   */
   stop: function (req, res) {
    
    // Send a JSON response
    return res.json({
      hello: 'world'
    });
  },




  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to LessonController)
   */
  _config: {}

  
};
