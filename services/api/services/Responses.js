const Moment = require('moment');
const MomentRange = require('moment-range');
const moment = MomentRange.extendMoment(Moment);

module.exports = {
  //---------------------------------------------------
  //  ---------- COURSE INFORMATION RESPONSES ---------
  //---------------------------------------------------

  course_description: function(courses) {
    return frameButtonFBTemplate(courses[0]);
  },

  course_career: function(courses) {
    let subtitle = `Career options for ${courses[0].code} are: `;

    for (let course of courses) {
      subtitle = `${subtitle} ${course.career},`;
    }
    subtitle = subtitle.substring(0, subtitle.length - 1);
    return frameGenericFBTemplate(courses[0], subtitle);
  },

  course_enrollment_requirements: function(courses) {
    return frameGenericFBTemplate(courses[0], courses[0].enrolment_requirements, true, false, true);
  },

  course_enrollment_capacity: function(courses) {
    let subtitle = '';

    courses[0].class_detail.forEach(function(classDetail, index) {
      subtitle += 'Class# ' + classDetail.class_nbr + '\n';
      subtitle += 'Section ' + classDetail.section + '\n';
      subtitle += 'Capacity ' + classDetail.capacity + '\n';
      subtitle += 'Offering period ' + classDetail.offering_period + '\n\n';
    });

    let title = 'Enrolment capacity for ' + courses[0].code + courses[0].course_title;
    return frameGenericFBTemplate(courses[0], subtitle, true, false, true, title);
  },

  course_lookup: function(courses) {
    if (courses.length == 0) {
      return frameGenericFBTemplate(null, 'I could not fine any relevant courses for your lookup', false, false, false);
    }
    let response = frameGenericFBTemplate(null, 'Here are a few courses relevant to what you are looking for ', false, false, false);

    courses.forEach(function(course, index) {
      let btn = defineFBButton(course.handbook_link, ''+course.code+' '+course.course_title+' ('+course.career+')');
      response.data.facebook.attachment.payload.elements[0].buttons.push(btn);
    });
    return response;
  },

  course_outline: function(courses) {
    let title = 'Outline for '+courses[0].code+' '+courses[0].course_title;
    return frameGenericFBTemplate(courses[0], "", false, true, false, title);
  },

  course_page_link: function(courses) {
    let subtitle = 'Here is the page link for '+courses[0].code+' '+courses[0].course_title;
    return frameGenericFBTemplate(courses[0], subtitle, false, true, false);
  },

  course_units_of_credit: function(courses) {
    return frameGenericFBTemplate(courses[0], `UOC for ${courses[0].code} ${courses[0].course_title} are ${courses[0].units_of_credit}`, true, false, false);
  },

  //---------------------------------------------------
  //  ---------- CLASS DETAILS RESPONSES ----------
  //---------------------------------------------------
  classdetail_day_info: function(courses) {
    //let courseList = [];
    if (courses.length == 0) {
      return frameGenericFBTemplate(null, 'There are no such courses being offered this day', false, false, false);
    }
    let response = frameGenericFBTemplate(null, 'Here are some courses being offered on this day', false, false, false);

    courses.forEach(function(course, index) {
      let btn = defineFBButton(course.handbook_link, ''+course.code+' '+course.course_title+' ('+course.career+')');
      response.data.facebook.attachment.payload.elements[0].buttons.push(btn);
    });
    return response;

    /*let elements = [
      {
        title:'Here are some courses offered on this day',
        subtitle: ''
      },
      {
        buttons: courseList
      }
    ];*/

    //return frameListFBTemplate(null, elements, false, false, false);
  },

  classdetail_instructor: function(courses) {
    let responseString = courses[0].class_detail[0].instructor+' is the instructor for '+courses[0].code+' '+courses[0].course_title;
    return (frameButtonFBTemplate(courses[0], responseString, true, false, false));
  },

  classdetail_lecture_duration: function(courses) {
    let responseString = 'Lecture duration for '+courses[0].code+' '+courses[0].course_title+' is '+courses[0].class_detail[0].time+' on '+courses[0].class_detail[0].day;
    return (frameButtonFBTemplate(courses[0], responseString, false, false, true));
  },

  classdetail_lecture_mode: function(courses) {
    let responseString = '';

    courses.forEach(function(course, index) {
      responseString += 'Lecture modes for ' + course.code + ' '+course.career+' are:';
      course.class_detail.forEach(function(classDetail, index) {
        responseString += '\nClass# ' + classDetail.class_nbr + '\n';
        responseString += 'Section ' + classDetail.section + '\n';
        responseString += 'Instruction mode: ' + classDetail.instruction_mode + '\n';
      });
    });

    return (frameButtonFBTemplate(courses[0], responseString, false, false, true));
  },

  classdetail_lecture_location: function(courses) {

    let responseString = '';

    courses.forEach(function(course, index) {
      responseString += course.code + ' '+course.career+' ';
      course.class_detail.forEach(function(classDetail, index) {
        responseString += '\nClass# ' + classDetail.class_nbr + '\n';
        responseString += 'Section ' + classDetail.section + '\n';
        responseString += 'Lecture location: ' + classDetail.location + '\n';
      });
    });

    return (frameButtonFBTemplate(courses[0], responseString, false, false, true));
  },

  classdetail_timetable: function(courses) {
    let subtitle = 'You can find the timetable here for '+courses[0].code+' here';
    return frameGenericFBTemplate(courses[0], subtitle, false, false, true);
  },

  classdetail_clash: function (courses) {
    let clashes = [];
    let clash = false;

    for (i=0;i<courses.length;i++) {
      clash = false;

      if (i < courses.length-1) {
        let course1 = courses[i];

        for (j=i+1;j<courses.length;j++) {
          //clash = false;
          let course2 = courses[j];

          //if the courses are the same (happens in case if program is offered for both post and undergrad)
          if (course1.code != course2.code) {

            for (x=0;x<course1.class_detail.length;x++) {
              let classDetail1 = course1.class_detail[x];

              for (y=0;y<course2.class_detail.length;y++) {
                let classDetail2 = course2.class_detail[y];

                if (classDetail2.teaching_period == classDetail1.teaching_period
                  && classDetail2.day == classDetail1.day
                  && (classDetail2.offering_period == classDetail1.offering_period)//try to check overlap of offering dates too
                  && timeOverlap(classDetail2.time, classDetail1.time)) {

                  //this means there is a clash
                  clashes.push({
                    c1:{code:course1.code, day:classDetail1.day, time:classDetail1.time, course:course1},
                    c2:{code:course2.code, day:classDetail2.day, time:classDetail2.time, course:course2}
                  });
                  clash = true;
                  break;
                }
              }
              if (clash) {
                console.log('clash found');
                break;
              }
            }
            if (clash) {
              console.log('clash found');
              break;
            }
          }
        }
      }
    }
    let response = {};
    if (!clashes || clashes.length < 1) {
      subtitle = 'I did not find any clash between their lectures. You can enroll in these courses here';

      response = frameButtonFBTemplate(null, subtitle, false, false, false);
      response.data.facebook.attachment.payload.buttons.push(defineFBButton('https://my.unsw.edu.au/', 'Enroll'));

      //return frameGenericFBTemplate(null, subtitle, false, false, false, null, true);
    }
    else {

      let title = 'There is a clash in '+clashes[0].c1.code+' and '+clashes[0].c2.code+'\n';
      let subtitle = clashes[0].c1.code+' has classes on '+clashes[0].c1.day+' from '+clashes[0].c1.time+' and ';
      subtitle += clashes[0].c2.code+' has classes on '+clashes[0].c2.day+' from '+clashes[0].c2.time;

      //elements.push({title: title, subtitle: subtitle});
      let b1 = defineFBButton(clash.c1.course.class_timetable_link, ''+clash.c1.code+' Timetable');
      let b2 = defineFBButton(clash.c2.course.class_timetable_link, ''+clash.c2.code+' Timetable');

      //elements.push({buttons: buttons});
      response = frameButtonFBTemplate(null, title+subtitle, false, false, false);
      response.data.facebook.attachment.payload.buttons.push(b1);
      response.data.facebook.attachment.payload.buttons.push(b2);

      //return frameListFBTemplate(null, elements, false, false, false);
    }
    return response;
  },

  //---------------------------------------------------
  //  ---------- EXCEPTION RESPONSES ----------
  //---------------------------------------------------
  err_response: function() {
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
    facebook: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          buttons: [{
            type: "web_url",
            url: response.source,
            title: response.course + ' Handbook'
          }]
        }
      }
    }
  };
  response.data = data;

  return response;
}

// Generates a generic FB template for a single course
function frameGenericFBTemplate(course, subtitle = "", link_handbook = true, link_outline = true, link_timetable = true, title="") {

  subtitle = (subtitle == "") ? course.description : subtitle;
  //if (!title || title == "") title = course.code+' '+course.course_title;

  let generic_template = {
    speech: "Description",
    source: "chappie_middleware",
    displayText: "Course Details",
    data: {
      facebook: {
        attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: [{
              title: title,
              subtitle: subtitle,
              buttons: []
            }]
          }
        }
      }
    }
  };

  if (link_handbook && course.handbook_link) {
    generic_template.data.facebook.attachment.payload.elements[0].buttons.push({
      type: "web_url",
      url: course.handbook_link,
      title: 'Handbook link'
    });
  }

  if (link_outline && course.course_outline_link) {
    generic_template.data.facebook.attachment.payload.elements[0].buttons.push({
      type: "web_url",
      url: course.course_outline_link,
      title: 'Outline link'
    });
  }

  if (link_timetable && course.class_timetable_link) {
    generic_template.data.facebook.attachment.payload.elements[0].buttons.push({
      type: "web_url",
      url: course.class_timetable_link,
      title: "Timetable"
    });
  }
  return generic_template;
}

// Generates a button FB template for a single course
function frameButtonFBTemplate(course, displayText = "", link_handbook = true, link_outline = true, link_timetable = true) {
  displayText = (displayText == "") ? course.description : displayText;

  // Trim displayText to  640 characters | FB requirement
  displayText = displayText.substring(0, 640);

  let button_template = {
    speech: "Description",
    source: "chappie_middleware",
    displayText: "Course Details",
    data: {
      facebook: {
        attachment: {
          type: "template",
          payload: {
            template_type: "button",
            text: displayText,
            buttons: []
          }
        }
      }
    }
  };

  if (course.handbook_link && link_handbook) {
    button_template.data.facebook.attachment.payload.buttons.push({
      type: "web_url",
      url: course.handbook_link,
      title: 'Handbook link'
    });
  }

  if (course.course_outline_link && link_outline) {
    button_template.data.facebook.attachment.payload.buttons.push({
      type: "web_url",
      url: course.course_outline_link,
      title: 'Outline link'
    });
  }

  if (course.school_link && link_timetable) {
    button_template.data.facebook.attachment.payload.buttons.push({
      type: "web_url",
      url: course.class_timetable_link,
      title: "Timetable"
    });
  }

  return button_template;
}

// Generates a List FB template input elements
function frameListFBTemplate(course, elements, link_handbook = true, link_outline = true, link_school = true) {

  let list_template = {
    speech: "Description",
    source: "chappie_middleware",
    displayText: "Course Details",
    data: {
      facebook: {
        attachment: {
          type: "template",
          payload: {
            template_type: "list",
            top_element_style: "compact",
            elements: elements
          }
        }
      }
    }
  };

  return list_template;
}


// Returns an element of a list
function defineFBElement(title, subtitle, image_url, buttons) {
  let element = {
    title: title,
    subtitle: subtitle,
  };

  if (image_url) {
    element.image_url = image_url;
  }

  if (buttons) {
    element.buttons = buttons;
  }

  return element;
}

function defineFBButton(url, title) {
  let button = {
    type: "web_url",
    url: url,
    title: title
  };

  return button;
}

function timeOverlap(t1, t2) {
  let time1 = t1.split(' - ');
  let time2 = t2.split(' - ');

  var range1 = moment.range(moment(time1[0], 'hh:mm'), moment(time1[1], 'hh:mm'));
  var range2 = moment.range(moment(time2[0], 'hh:mm'), moment(time2[1], 'hh:mm'));

  return range1.overlaps(range2);

}
