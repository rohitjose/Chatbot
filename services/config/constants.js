module.exports.constant = {
  responses: {
    classdetail_lecture_mode: function(course) {
      return 'Lecture modes for ' + course + ' are: '
    },
    course_career: function(course) {
      return 'Course career for ' + course + ' is: '
    },
    course_description: function(course) {
      return '' + course + ' description: '
    },
    course_enrollment_requirements: function(course) {
      return 'Enrollment requirements for ' + course + ' are: '
    },
    course_lookup: function(course) {
      return 'Look up ' + course + ''
    },
    course_outline: function(course) {
      return '' + course + ' outline: '
    },
    course_page_link: function(course) {
      return 'Course page link for ' + course + ': '
    },
    course_units_of_credit: function(course) {
      return 'Units of credit for ' + course + ' are: '
    }
  }
}
