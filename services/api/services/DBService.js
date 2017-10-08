module.exports = {

  getCourses: function (params, cb) {
    params = JSON.parse(params);
    if (!params || !params.course_code) {
      return cb ('invalid arguments', null);
    }
    if (params.course_code instanceof Array && params.course_code.length > 1) {
      getClashes(params, cb);
    }
    else {
      normalFetch(params, cb);
    }
  }
}

function normalFetch(params, cb) {
  let query = generateQuery(params);

  Courses.find().where(query).exec(function (err, collection) {
    if (err) {
      return cb(err, null);
    }
    if (!collection || collection.length < 1) {
      query = generateQuery(params, true);
      Courses.find().where(query).exec(function (err, collection) {
        if (err) {
          return cb(err, null);
        }
        return cb(null, collection);
      });
    }
    else {
      return cb(null, collection);
    }
  });
}

function getClashes(params, cb) {

  let query = generateQuery(params, false);
  //query = {or:[{code:{'contains':'comp9321'}}, {code:{'contains':'COMP9318'}}], 'class_detail.day':'Mon'};

  Courses.find().where(query).exec(function (err, collection) {
    if (err) {
      return cb(err, null);
    }
    else if (!collection || collection.length < 1) {
      query = generateQuery(params, true);
      Courses.find().where(query).exec(function (err, coll) {
        if (err) {
          return cb(err, null);
        }
        return cb(null, coll);
      });
    }
    else if (collection.length < 2 || collection[0].code == collection[1].code) {
      params.course_code.splice(params.course_code.indexOf(collection[0].code), 1);
      query = generateQuery(params, true);
      let result = [].concat(collection);
      Courses.find().where(query).exec(function (err, coll) {
        if (err) {
          return cb(err, null);
        }
        result = result.concat(coll);
        return cb(null, result);
      });
    }
    else {
      return cb(null, collection);
    }
  });
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

function generateQuery(params, secondIter) {
  let qry = '{';
  let key2;

  Object.keys(params).forEach(function (key, index) {

    if (key == 'course_code') {
      if (secondIter) {
        key2 = 'course_title';
      }
      else {
        key2 = 'code';
      }
    }
    else if (key == 'day' || key == 'time' || key == 'activity' || key == 'teaching_period') {
      key2 = 'class_detail.'+key;
    }
    else {
      key2 = key;
    }

    if(params[key] instanceof Array) {
      if (qry.length > 1) qry += ', ';

      if (params[key].length > 1) {
        qry += '"or":['
        params[key].forEach(function (param, idx) {
          qry += '{"'+key2+'":{"contains":"'+param+'"}},';
        });
        qry = qry.substring(0, qry.length-1);
        qry += ']';
      }
      else {
        params[key].forEach(function (param, idx) {
          qry += '"'+key2+'":{"contains":"'+param+'"}';
        });
      }
    }
    else {
      if (qry.length > 1) qry += ', '
      qry += '"'+key2+'"'+':{'+'"contains"'+':'+'"'+days(params[key])+'"'+'}';
    }
  });
  qry += '}';
  return JSON.parse(qry);
}

function days(day) {
  if (day.toLowerCase() == 'monday' || day.toLowerCase() == 'mondays') {
    return 'mon';
  }
  if (day.toLowerCase() == 'tuesday' || day.toLowerCase() == 'tuesdays' || day.toLowerCase() == 'tues') {
    return 'tue';
  }
  if (day.toLowerCase() == 'wednesday' || day.toLowerCase() == 'wednesdays' || day.toLowerCase() == 'wednes') {
    return 'wed';
  }
  if (day.toLowerCase() == 'thursday' || day.toLowerCase() == 'thursdays' || day.toLowerCase() == 'thurs') {
    return 'thu';
  }
  if (day.toLowerCase() == 'friday' || day.toLowerCase() == 'fridays') {
    return 'fri';
  }
  if (day.toLowerCase() == 'saturday' || day.toLowerCase() == 'saturdays' || day.toLowerCase() == 'satur') {
    return 'sat';
  }
  if (day.toLowerCase() == 'sunday' || day.toLowerCase() == 'sundays') {
    return 'sun';
  }
  else return day;
}
