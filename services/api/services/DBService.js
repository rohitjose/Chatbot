module.exports = {

  getCourses: function (params, cb) {
    params = JSON.parse(params);
    if (!params || !params.course_code) {
      return cb ('invalid arguments', null);
    }

    let query = generateQuery(params);

    Courses.find().where(query).exec(function (err, collection) {
      if (err) {
        return cb(err, null);
      }
      return cb(null, collection);
    });

  }
}

/*
function getCourseInfo(params, cb) {
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
*/

function generateQuery(params) {
  let query = [];
  let key2;

  Object.keys(params).forEach(function (key, index) {

    if (key == 'course_code') {
      key2 = 'code';
    }
    else if (key == 'day' || key == 'time') {
      key2 = 'class_detail.'+key;
    }
    else {
      key2 = key;
    }

    if(params[key] instanceof Array) {
      let or = [];

      params[key].forEach(function (param, idx) {
        or.push({[key2]:{'contains':days(param)}});

        //if key is code then also add a parameter 'title' for searching on title
        if (key2 == 'code') {
          or.push({course_title:{'contains':param}});
        }
      });

      query.push({or:or});
    }
    else {
      //if key is code then also add a parameter 'title' for searching on title
      if (key2 == 'code') {
        query.push({or:[{code:{'contains':params[key]}}, {course_title:{'contains':params[key]}}]});
      }
      else {
        query.push({[key2]:{'contains':days(params[key])}});
      }
    }
  });
  return query;
}

function days(day) {
  if (day.toLowerCase() == 'monday' || day.toLowerCase() == 'mon') {
    return 'mon';
  }
  if (day.toLowerCase() == 'tuesday' || day.toLowerCase() == 'tues') {
    return 'tue';
  }
  if (day.toLowerCase() == 'wednesday' || day.toLowerCase() == 'wedns') {
    return 'wed';
  }
  if (day.toLowerCase() == 'thursday' || day.toLowerCase() == 'thurs') {
    return 'thu';
  }
  if (day.toLowerCase() == 'friday' || day.toLowerCase() == 'fri') {
    return 'fri';
  }
  if (day.toLowerCase() == 'saturday' || day.toLowerCase() == 'satur') {
    return 'sat';
  }
  if (day.toLowerCase() == 'sunday' || day.toLowerCase() == 'sun') {
    return 'sun';
  }
  else return day;
}
