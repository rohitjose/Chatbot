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

    //courses.forEach(function(course, index) {
    //  responseString += '\nEnrolment capacity for ' + course.code + ':\n';
    courses[0].class_detail.forEach(function(classDetail, index) {
      subtitle += 'Class# ' + classDetail.class_nbr + '\n';
      subtitle += 'Section ' + classDetail.section + '\n';
      subtitle += 'Capacity ' + classDetail.capacity + '\n';
      subtitle += 'Offering period ' + classDetail.offering_period + '\n\n';
    });
    //});

    let title = 'Enrolment capacity for ' + courses[0].code + courses[0].course_title;

    return frameGenericFBTemplate(courses[0], subtitle, true, false, true, title);
  },

  course_lookup: function(courses) {
    let courseList = [];
    let count = 0; // Counter to map 3 courses matches


    for (let course of courses) {
      if (count < 4) {

        // Generate button
        let handbook_link_button = defineFBButton(course.handbook_link, "More Info", true);
        let button_array = [];
        button_array.push(handbook_link_button);

        // Generate title
        let title = `${course.code} ${course.course_title}`;
        if (course.career) {
          let trim_length = title.length - (course.career.length + 2)
          title = `${title.substring(0,trim_length)} (${course.career})`;
        }

        let element = defineFBElement(title, course.description.substring(0, 80), null, button_array);
        courseList.push(element);
        count++;
      } else {
        break;
      }
    }

    // Build payload
    let main_button_array = [];

    main_button_array.push(defineFBButton("http://www.handbook.unsw.edu.au/2018/index.html", "UNSW Handbook"));
    let payload = {
      template_type: "list",
      top_element_style: "compact",
      elements: courseList,
      buttons: main_button_array
    };

    return frameListFBTemplateFromPayload(payload);

  },

  course_outline: function(courses) {
    let title = 'Outline for ' + courses[0].code + ' ' + courses[0].course_title;
    return frameGenericFBTemplate(courses[0], "", false, true, false, title);
  },

  course_page_link: function(courses) {
    let subtitle = 'Here is the page link for ' + courses[0].code + ' ' + courses[0].course_title;
    return frameGenericFBTemplate(courses[0], subtitle, false, true, false);
  },

  course_units_of_credit: function(courses) {
    return frameGenericFBTemplate(courses[0], `UOC for ${courses[0].code} ${courses[0].course_title} are ${courses[0].units_of_credit}`, true, false, false);
  },

  //---------------------------------------------------
  //  ---------- CLASS DETAILS RESPONSES ----------
  //---------------------------------------------------
  classdetail_day_info: function(courses, params) {

    let query_day = params.day; // request day parameter
    let course_code_list = [];
    let courseList = []; // Element list for the courses
    let count = 0;

    for (let course of courses) {
      if (count < 4) {
        // Check for redundant course
        if (course_code_list.indexOf(course.code) == -1) {
          course_code_list.push(course.code);

          // Generate title
          let title = `${course.code} ${course.course_title}`;


          // Generate button
          let timetable_link = defineFBButton(course.class_timetable_link, "More Info", true);
          let button_array = [];
          button_array.push(timetable_link);

          let class_details = "";

          // Check in class details
          for (let detail of course.class_detail) {
            console.log("================== CLASS DETAIL ======================");
            console.log(detail);
            console.log("================== CLASS DETAIL ======================");
            if (query_day == detail.day) {
              class_details = `${class_details}\n${detail.activity}(${detail.section})   -   ${detail.day}|${detail.time}`;
            } else {
              console.log("================== MAPPING ======================");
              console.log(`query_day - ${query_day}`);
              console.log(`detail.day - ${detail.day}`);
              console.log("================== MAPPING ======================");
            }
          }

          //Build element
          let element = defineFBElement(title.substring(0, 80), class_details.substring(0, 80), null, button_array);
          courseList.push(element);
          count++;
        }
      } else {
        break;
      }
    }

    // Build payload
    let main_button_array = [];

    main_button_array.push(defineFBButton("http://www.handbook.unsw.edu.au/2018/index.html", "UNSW Handbook"));
    let payload = {
      template_type: "list",
      top_element_style: "compact",
      elements: courseList,
      buttons: main_button_array
    };

    return frameListFBTemplateFromPayload(payload);


  },

  classdetail_instructor: function(courses) {
    let responseString = courses[0].class_detail[0].instructor + ' is the instructor for ' + courses[0].code + ' ' + courses[0].course_title;
    return (frameButtonFBTemplate(courses[0], responseString, true, false, false));
  },

  classdetail_lecture_duration: function(courses) {
    let responseString = 'Lecture duration for ' + courses[0].code + ' ' + courses[0].course_title + ' is ' + courses[0].class_detail[0].time + ' on ' + courses[0].class_detail[0].day;
    return (frameButtonFBTemplate(courses[0], responseString, false, false, true));
  },

  classdetail_lecture_mode: function(courses) {
    let responseString = '';

    courses.forEach(function(course, index) {
      responseString += 'Lecture modes for ' + course.code + ' ' + course.career + ' are:';
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
      responseString += course.code + ' ' + course.career + ' ';
      course.class_detail.forEach(function(classDetail, index) {
        responseString += '\nClass# ' + classDetail.class_nbr + '\n';
        responseString += 'Section ' + classDetail.section + '\n';
        responseString += 'Lecture location: ' + classDetail.location + '\n';
      });
    });

    return (frameButtonFBTemplate(courses[0], responseString, false, false, true));
  },

  classdetail_timetable: function(courses) {
    let subtitle = 'You can find the timetable here: ';
    return frameGenericFBTemplate(courses[0], subtitle, false, false, true);
  },

  classdetail_clash: function(courses) {
    let clashes = [];
    let buttons = [];
    let elements = [];
    let clash = false;

    for (i = 0; i < courses.length; i++) {
      clash = false;

      if (i < courses.length - 1) {
        let course1 = courses[i];

        for (j = i + 1; j < courses.length; j++) {
          //clash = false;
          let course2 = courses[j];

          //if the courses are the same (happens in case if program is offered for both post and undergrad)
          if (course1.code != course2.code) {

            for (x = 0; x < course1.class_detail.length; x++) {
              let classDetail1 = course1.class_detail[x];

              for (y = 0; y < course2.class_detail.length; y++) {
                let classDetail2 = course2.class_detail[y];

                if (classDetail2.teaching_period == classDetail1.teaching_period && classDetail2.day == classDetail1.day && (classDetail2.offering_period == classDetail1.offering_period) //try to check overlap of offering dates too
                  && timeOverlap(classDetail2.time, classDetail1.time)) {

                  //this means there is a clash
                  clashes.push({
                    c1: {
                      code: course1.code,
                      day: classDetail1.day,
                      time: classDetail1.time,
                      course: course1
                    },
                    c2: {
                      code: course2.code,
                      day: classDetail2.day,
                      time: classDetail2.time,
                      course: course2
                    }
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
    if (!clashes || clashes.length < 1) {
      subtitle = 'I did not find any clash between their lectures. You should be able to enroll in these courses.';
      elements.push({
        subtitle: subtitle
      });
    } else {
      clashes.forEach(function(clash, index) {
        let title = 'Clash in ' + clash.c1.code + ' and ' + clash.c2.code;
        let subtitle = clash.c1.code + ' has classes on ' + clash.c1.day + ' from ' + clash.c1.time + ' and ';
        subtitle += clash.c2.code + ' has classes on ' + clash.c2.day + ' from ' + clash.c2.time;

        elements.push({
          title: title,
          subtitle: subtitle
        });
        buttons.push(defineFBButton(clash.c1.course.class_timetable_link, '' + clash.c1.code + ' Timetable'));
        buttons.push(defineFBButton(clash.c2.course.class_timetable_link, '' + clash.c2.code + ' Timetable'));
      });
      elements.push({
        buttons: buttons
      });
    }

    return frameListFBTemplate(null, elements, false, false, false);
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
function frameGenericFBTemplate(course, subtitle = "", link_handbook = true, link_outline = true, link_timetable = true, title) {
  subtitle = (subtitle == "") ? course.description : subtitle;
  if (!title || title == "") title = course.code + ' ' + course.course_title;

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

  if (course.handbook_link && link_handbook) {
    generic_template.data.facebook.attachment.payload.elements[0].buttons.push({
      type: "web_url",
      url: course.handbook_link,
      title: 'Handbook link'
    });
  }

  if (course.course_outline_link && link_outline) {
    generic_template.data.facebook.attachment.payload.elements[0].buttons.push({
      type: "web_url",
      url: course.course_outline_link,
      title: 'Outline link'
    });
  }

  if (course.class_timetable_link && link_timetable) {
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

// Generates a List template based on the payload
function frameListFBTemplateFromPayload(payload) {

  let list_template = {
    speech: "Description",
    source: "chappie_middleware",
    displayText: "Course Details",
    data: {
      facebook: {
        attachment: {
          type: "template",
          payload: payload
        }
      }
    }
  };

  return list_template;
}


// Returns an element of a list
function defineFBElement(title, subtitle, image_url = null, buttons = null) {
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

function defineFBButton(url, title, webview_height_ratio = false) {
  let button = {
    type: "web_url",
    url: url,
    title: title
  };

  if (webview_height_ratio) {
    button.webview_height_ratio = "tall";
  }

  return button;
}

function timeOverlap(t1, t2) {
  let time1 = t1.split(' - ');
  let time2 = t2.split(' - ');

  var range1 = moment.range(moment(time1[0], 'hh:mm'), moment(time1[1], 'hh:mm'));
  var range2 = moment.range(moment(time2[0], 'hh:mm'), moment(time2[1], 'hh:mm'));

  return range1.overlaps(range2);

}