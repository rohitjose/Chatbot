module.exports = {
  course_description: function (req, res) {
    execute(req, res);
  },

  classdetail_lecture_mode: function (req, res) {
    execute(req, res);
  },

  course_career: function (req, res) {
    execute(req, res);
  },

  course_enrollment_requirements: function (req, res) {
    execute(req, res);
  },

  course_lookup: function (req, res) {
    execute(req, res);
  },

  carecourse_outlineerInformation: function (req, res) {
    execute(req, res);
  },

  course_page_link:function (req, res) {
    execute(req, res);
  },

  course_units_of_credit: function (req, res) {
    execute(req, res);
  }
}

function execute(req, res) {
  let params = req.param('parameters');
  console.log('fetching data ...')

  DBService.execute(params, function(err, data){
    if (err) {
      return res.badRequest({
        status: 'error',
        msg: err
      });
    }
    console.log(data);
    return res.ok({
      status: 'success',
      data:data
    });
  });
}
