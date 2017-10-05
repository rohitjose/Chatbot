module.exports = {
  execute: function (params, cb) {

    params = JSON.parse(params);
    if (!params || !params.course_code) {
      return cb ('invalid arguments', null);
    }
    //can insert check on course_code to strictly fetch based on the code

    Courses.find().where({code:{'contains':params.course_code}}).exec(function (err, collection) {
      console.log('searching on code with : '+params.course_code);
      if (err) {
        console.log(err.message);
        return cb(err, null);
      }
      if (collection && collection.length > 0) {
        return cb(null, collection);
      }

      //if no records returned on code search then try searching on the course_title
      Courses.find().where({course_title:{'contains':params.course_code}}).exec(function (err, collection) {
        console.log('searching on title with title : '+params.course_code);
        if (err) {
          console.log(err.message);
          return cb(err, null);
        }
        if (collection && collection.length > 0) {
          return cb(null, collection);
        }
        return cb(null, []);
      });
    });
  }
}
