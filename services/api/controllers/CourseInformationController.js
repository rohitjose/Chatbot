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
    //do filtering of relevent data and create response string
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.course_career(courses));
      }
    });
  },

  course_enrollment_requirements: function (req, res) {
    //do filtering of relevent data and create response string
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.course_enrollment_requirements(courses));
      }
    });
  },

  course_enrollment_capacity: function (req, res) {
    //do filtering of relevent data and create response string
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.course_enrollment_capacity(courses));
      }
    });
  },

  course_lookup: function (req, res) {
    //do filtering of relevent data and create response string
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.course_lookup(courses));
      }
    });
  },

  course_outline: function (req, res) {
    //do filtering of relevent data and create response string
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.course_outline(courses));
      }
    });
  },

  course_page_link:function (req, res) {
    //do filtering of relevent data and create response string
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.course_page_link(courses));
      }
    });
  },

  course_units_of_credit: function (req, res) {
    //do filtering of relevent data and create response string
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
    //do filtering of relevent data and create response string
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.classdetail_day_info(courses));
      }
    });
  },

  classdetail_instructor: function (req, res) {
    //do filtering of relevent data and create response string
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.classdetail_instructor(courses));
      }
    });
  },

  classdetail_lecture_duration: function (req, res) {
    //do filtering of relevent data and create response string
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.classdetail_lecture_duration(courses));
      }
    });
  },

  classdetail_lecture_mode: function (req, res) {
    //do filtering of relevent data and create response string
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.classdetail_lecture_mode(courses));
      }
    });
  },

  classdetail_lecture_location: function (req, res) {
    //do filtering of relevent data and create response string
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.classdetail_lecture_location(courses));
      }
    });
  },

  classdetail_timetable: function (req, res) {
    //do filtering of relevent data and create response string
    execute(req, res, function (err, courses) {
      if (!err && courses) {
        return res.ok(Responses.classdetail_timetable(courses));
      }
    });
  }
}

function execute(req, res, cb) {
  let params = req.param('parameters');
  console.log('fetching data ...')

  DBService.execute(params, function(err, data){
    if (err) {
      res.badRequest(Responses.err_response());
      return cb(err, null);
    }
    // if (!data || data.length < 1) {
    //   res.badRequest(Responses.not_found_response());
    //   return cb(err, null);
    // }
    else {
      console.log(data);
      return cb(null, data);
    }
  });
}
