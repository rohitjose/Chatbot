module.exports = {
  executeRequest: function (params) {
    //let params = req.param('parameters');
    Courses.find(params).exec(function (err, collection) {
      if (err) {
        return res.badRequest({
          status:'error',
          msg:err
        });
      }

      console.log(collection);
      return '';
    });
  }
}
