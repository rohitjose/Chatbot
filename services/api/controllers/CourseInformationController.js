module.exports = {
  get: function (req, res) {

    let params = req.param('parameters');
    params = JSON.parse(params);

    Courses.find(params).exec(function (err, collection) {
      if (err) {
        return res.badRequest({
          status:'error',
          msg:err
        });
      }

      console.log(collection);
      return res.ok({data:collection});
    });
  },

  prerequisites: function (req, res) {
    let course = param('code');
    let params = {};

    if (!course) {
      return res.badRequest({
        status: 'error',
        msg: 'invalid arguments'
      });
    }

    params.code = course;

    DBService.executeRequest(params, res);
  },

  courseInformation: function (req, res) {
    let code = req.param('code');
    let title = req.param('title');

    if (!code && !title) {
      return res.badRequest({
        status: 'error',
        msg: 'invalid arguments'
      });
    }

    let params = {};
    if (code) params.code = code;
    if (title) params.title = title;

    DBService.executeRequest(params, res);
  },

  courseDescription: function (req, res) {
    let code = req.param('')

  },

  pageLink: function (req, res) {

  },

  careerInformation: function (req, res) {

  },

  UOC:function (req, res) {

  },

  careerOutline: function (req, res) {

  }

}
