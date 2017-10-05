module.exports = {
  //---------------------------------------------------
  //  ---------- COURSE INFORMATION RESPONSES ---------
  //---------------------------------------------------

  course_career: function(courses) {
    let responseString = 'Career options for:'+courses[0].code+'\n';

    courses.forEach(function (course, index) {
      responseString += 'Career: '+course.career+'\n';
    });

    return {
      status: 'success',
      displayText: responseString,
      speech: responseString,
      source: courses[0].handbook_link
    };
  },

  course_description: function(courses) {
    let responseString = '';

    courses.forEach(function (course, index) {
      responseString += 'Description for '+course.code+' '+course.course_title+':\n';
      responseString += 'Career: '+course.career+'\n';
      responseString += 'Description: '+course.description+'\n';
    });

    return {
      status: 'success',
      displayText: responseString,
      speech: responseString,
      source: courses[0].handbook_link
    };
  },

  course_enrollment_requirements: function(courses) {
    let responseString = '';

    courses.forEach(function (course, index) {
      responseString += 'Description for '+course.code+' '+course.course_title+':\n';
      responseString += 'Career: '+course.career+'\n';
      responseString += 'Description: '+course.description+'\n';
    });

    return {
      status: 'success',
      displayText: responseString,
      speech: responseString,
      source: courses[0].handbook_link
    };
  },

  course_lookup: function(courses) {
    let responseString = '';

    courses.forEach(function (course, index) {
      responseString += 'Description for '+course.code+' '+course.course_title+':\n';
      responseString += 'Career: '+course.career+'\n';
      responseString += 'Description: '+course.description+'\n';
    });

    return {
      status: 'success',
      displayText: responseString,
      speech: responseString,
      source: courses[0].handbook_link
    };
  },

  course_outline: function(courses) {
    let responseString = '';

    courses.forEach(function (course, index) {
      responseString += 'Description for '+course.code+' '+course.course_title+':\n';
      responseString += 'Career: '+course.career+'\n';
      responseString += 'Description: '+course.description+'\n';
    });

    return {
      status: 'success',
      displayText: responseString,
      speech: responseString,
      source: courses[0].handbook_link
    };
  },

  course_page_link: function(courses) {
    let responseString = '';

    courses.forEach(function (course, index) {
      responseString += 'Description for '+course.code+' '+course.course_title+':\n';
      responseString += 'Career: '+course.career+'\n';
      responseString += 'Description: '+course.description+'\n';
    });

    return {
      status: 'success',
      displayText: responseString,
      speech: responseString,
      source: courses[0].handbook_link
    };
  },

  course_units_of_credit: function(courses) {
    let responseString = '';

    courses.forEach(function (course, index) {
      responseString += 'Description for '+course.code+' '+course.course_title+':\n';
      responseString += 'Career: '+course.career+'\n';
      responseString += 'Description: '+course.description+'\n';
    });

    return {
      status: 'success',
      displayText: responseString,
      speech: responseString,
      source: courses[0].handbook_link
    };
  },

  //---------------------------------------------------
  //  ---------- CLASS DETAILS RESPONSES ----------
  //---------------------------------------------------
  classdetail_lecture_mode: function(courses) {
    let responseString = '';

    courses.forEach(function (course, index) {
      responseString += 'Description for '+course.code+' '+course.course_title+':\n';
      responseString += 'Career: '+course.career+'\n';
      responseString += 'Description: '+course.description+'\n';
    });

    return {
      status: 'success',
      displayText: responseString,
      speech: responseString,
      source: courses[0].handbook_link
    };
  },

  //---------------------------------------------------
  //  ---------- EXCEPTION RESPONSES ----------
  //---------------------------------------------------
  err_response: function(){
    return {
      status: 'error',
      displayText: 'Sorry! We are having some technical issues right now.\n Try querying after some time'
    }
  },

  not_found_response: function() {
    return {
      status: 'error',
      displayText: 'No results found'
    }
  }
}
