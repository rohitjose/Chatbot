module.exports = {
  //---------------------------------------------------
  //  ---------- COURSE INFORMATION RESPONSES ---------
  //---------------------------------------------------

  course_description: function(courses) {
    let responseString = '';

    courses.forEach(function (course, index) {
      responseString += 'Description for '+course.code+' '+course.course_title+':\n';
      responseString += 'Career: '+course.career+'\n';
      responseString += 'Description: '+course.description+'\n';
    });

    let response =  {
      status: 'success',
      displayText: responseString,
      speech: responseString,
      source: courses[0].handbook_link,
      course: courses[0].code
    };
    return addUrlButtonToResponse(response);
  },

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

  course_enrollment_requirements: function(courses) {
    let responseString = '';

    courses.forEach(function (course, index) {
      responseString += 'Enrolment requirements for '+course.code+':\n';
      responseString += course.enrolment_requirements+'\n';
    });

    return {
      status: 'success',
      displayText: responseString,
      speech: responseString,
      source: courses[0].handbook_link
    };
  },

  course_enrollment_capacity: function (courses) {
    let responseString = '';

    courses.forEach(function (course, index) {
      responseString += '\nEnrolment capacity for '+course.code+':\n';
      course.class_detail.forEach(function (classDetail, index) {
        responseString += 'Capacity '+classDetail.capacity+'\n';
        responseString += 'Class# '+classDetail.class_nbr+'\n';
        responseString += 'Section '+classDetail.section+'\n';
        responseString += 'Offering period '+classDetail.offering_period+'\n\n';
      });
    });

    return {
      status: 'success',
      displayText: responseString,
      speech: responseString,
      source: courses[0].handbook_link
    };
  },

  course_lookup: function(courses) {
    /*let responseString = '';

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
    };*/
  },

  course_outline: function(courses) {
    let responseString = '';

    courses.forEach(function (course, index) {
      responseString += 'Outline for '+course.code+' can be found here:\n';
      //responseString += course.course_outline+'\n';
    });

    let response =  {
      status: 'success',
      displayText: responseString,
      speech: responseString,
      source: courses[0].course_outline
    };
    return addUrlButtonToResponse(response);
  },

  course_page_link: function(courses) {
    let responseString = '';

    courses.forEach(function (course, index) {
      responseString += 'You can get details for '+course.code+' at\n';
      //responseString += course.handbook_link;
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
      responseString += 'UOC for '+course.code+': '+course.units_of_credit;
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
  classdetail_day_info: function (courses) {
    let responseString = '';

    courses.forEach(function (course, index) {
      responseString += 'Lecture modes for '+course.code+' are:';
      course.class_detail.forEach(function (classDetail, index) {
        responseString += '\nClass# '+classDetail.class_nbr+'\n';
        responseString += 'Section '+classDetail.section+'\n';
        responseString += 'Instruction mode: '+classDetail.instruction_mode+'\n';
      });
    });

    return {
      status: 'success',
      displayText: responseString,
      speech: responseString,
      source: courses[0].handbook_link
    };
  },

  classdetail_instructor: function (courses) {

  },

  classdetail_lecture_duration: function (courses) {

  },

  classdetail_lecture_mode: function(courses) {
    let responseString = '';

    courses.forEach(function (course, index) {
      responseString += 'Lecture modes for '+course.code+' are:';
      course.class_detail.forEach(function (classDetail, index) {
        responseString += '\nClass# '+classDetail.class_nbr+'\n';
        responseString += 'Section '+classDetail.section+'\n';
        responseString += 'Instruction mode: '+classDetail.instruction_mode+'\n';
      });
    });

    return {
      status: 'success',
      displayText: responseString,
      speech: responseString,
      source: courses[0].handbook_link
    };
  },

  classdetail_lecture_location: function (courses) {

  },

  classdetail_timetable: function (courses) {

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

function addUrlButtonToResponse(response) {
  let data = {
    facebook:{
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          buttons: [{
            type: "web_url",
            url: response.source,
            title: response.course+' Handbook'
          }]
        }
      }
    }
  };
  response.data = data;

  return response;
}
