module.exports = {
  execute: function (params, cb) {
    params = JSON.parse(params);
    Courses.find(params).exec(function (err, collection) {

      return cb(err, collection);
    });
  }
}
