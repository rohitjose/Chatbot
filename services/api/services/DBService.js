module.exports = {

  /*
  * the only exposed method here to request data from mongodb
  */
  getCourses: function(params, cb) {
    params = JSON.parse(params);
    if (!params || !params.course_code) {
      return cb('invalid arguments', null);
    }

    //to remove any whitespaces before or after given parameters
    params = trimParams(params);

    if (params.course_code instanceof Array && params.course_code.length > 1) {
      getClashes(params, cb);
    } else {
      normalFetch(params, cb);
    }
  }
}

/*
* remove white spaces  from params
*/
function trimParams(params) {
  for (let key in params) {
    if (params[key] instanceof Array) {
      params[key].map(s => s.trim());
    } else {
      params[key] = params[key].trim();
    }
  }

  return params;
}

/*
* fetches the data for a single course based on the given parameters
*/
function normalFetch(params, cb) {
  let query = generateQuery(params);

  Courses.find().where(query).exec(function(err, collection) {
    if (err) {
      return cb(err, null);
    }
    if (!collection || collection.length < 1) {
      query = generateQuery(params, true);
      Courses.find().where(query).exec(function(err, collection) {
        if (err) {
          return cb(err, null);
        }
        return cb(null, collection);
      });
    } else {
      return cb(null, collection);
    }
  });
}

/*
* fetches data for multiple courses if more than one parameter given for course_code,
* can be used to detect clashes in timetable etc
*/
function getClashes(params, cb) {
  let query = generateQuery(params, false);

  Courses.find().where(query).exec(function(err, collection) {
    if (err) {
      return cb(err, null);
    } else if (!collection || collection.length < 1) {
      query = generateQuery(params, true);
      Courses.find().where(query).exec(function(err, coll) {
        if (err) {
          return cb(err, null);
        }
        return cb(null, coll);
      });
    } else if (collection.length < 2 || collection[0].code == collection[1].code) {
      params.course_code.splice(params.course_code.indexOf(collection[0].code), 1);
      query = generateQuery(params, true);
      let result = [].concat(collection);
      Courses.find().where(query).exec(function(err, coll) {
        if (err) {
          return cb(err, null);
        }
        result = result.concat(coll);
        return cb(null, result);
      });
    } else {
      return cb(null, collection);
    }
  });
}

/*
* Iterates over all the parameters in the request and creates a query
* dynamically based on those params to fetch relevant data from the database
*/
function generateQuery(params, secondIter) {
  let qry = '{';
  let key2;

  Object.keys(params).forEach(function(key, index) {

    if (key == 'course_code') {
      if (secondIter) {
        key2 = 'course_title';
      } else {
        key2 = 'code';
      }
    } else if (key == 'day' || key == 'time' || key == 'activity' || key == 'teaching_period') {
      key2 = 'class_detail.' + key;
    } else {
      key2 = key;
    }

    if (params[key] instanceof Array) {
      if (qry.length > 1) qry += ', ';

      if (params[key].length > 1) {
        qry += '"or":['
        params[key].forEach(function(param, idx) {
          qry += '{"' + key2 + '":{"contains":"' + param + '"}},';
        });
        qry = qry.substring(0, qry.length - 1);
        qry += ']';
      } else {
        params[key].forEach(function(param, idx) {
          qry += '"' + key2 + '":{"contains":"' + param + '"}';
        });
      }
    } else {
      if (qry.length > 1) qry += ', '
      qry += '"' + key2 + '"' + ':{' + '"contains"' + ':' + '"' + days(params[key]) + '"' + '}';
    }
  });
  qry += '}';
  return JSON.parse(qry);
}

/*
* map the given day to a format in which its saved in the handbook,
* this can be used to understand different formats in which a user
* might input the day of week parameter
*/
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
