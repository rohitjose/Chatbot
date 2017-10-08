module.exports = {
  //------------------------------------------
  //  ---------- COURSE INFORMATION ----------
  //------------------------------------------
  course_description: function (req, res) {
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.course_description(courses));
      }
    });
  },

  course_career: function (req, res) {
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.course_career(courses));
      }
    });
  },

  course_enrollment_requirements: function (req, res) {
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.course_enrollment_requirements(courses));
      }
    });
  },

  course_enrollment_capacity: function (req, res) {
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.course_enrollment_capacity(courses));
      }
    });
  },

  course_lookup: function (req, res) {
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.course_lookup(courses));
      }
    });
  },

  course_outline: function (req, res) {
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.course_outline(courses));
      }
    });
  },

  course_page_link:function (req, res) {
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.course_page_link(courses));
      }
    });
  },

  course_units_of_credit: function (req, res) {
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.course_units_of_credit(courses));
      }
    });
  },

  //--------------------------------------
  //   ---------- CLASS DETAILS ----------
  //--------------------------------------
  classdetail_day_info: function (req, res) {
    let params = req.param('parameters');
    params = JSON.parse(params);
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.classdetail_day_info(courses, params));
      }
    });
  },

  classdetail_instructor: function (req, res) {
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.classdetail_instructor(courses));
      }
    });
  },

  classdetail_lecture_duration: function (req, res) {
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.classdetail_lecture_duration(courses));
      }
    });
  },

  classdetail_lecture_mode: function (req, res) {
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.classdetail_lecture_mode(courses));
      }
    });
  },

  classdetail_lecture_location: function (req, res) {
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.classdetail_lecture_location(courses));
      }
    });
  },

  classdetail_timetable: function (req, res) {
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.classdetail_timetable(courses));
      }
    });
  },

  classdetail_clash: function (req, res) {
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.classdetail_clash(courses));
      }
    });
  }
}

function execute(req, res, cb) {
  let params = req.param('parameters');
  console.log('fetching data ...')

  DBService.getCourses(params, function(err, data){
    if (err || !data || data.length == 0) {
      res.badRequest(Responses.err_response());
      return cb(err, null);
    }
    else {
      console.log(data);
      if (data.length > 6) return cb(null, data.slice(0, 5));
      return cb(null, data);
    }
  });
}
