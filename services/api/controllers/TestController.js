var MongoClient = require('mongodb').MongoClient;

module.exports = {
  get: function (req, res) {

    let params = req.param('parameters');
    Courses.find(params).exec(function (err, collection) {

      console.log(collection);
      return res.ok({data:collection});
    });
  }
}
