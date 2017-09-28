module.exports = {
  attributes: {
    _id: {
      type: 'string'
    },
    code: {
      type: 'string'
    },
    handbook_link: {
      type: 'string'
    },
    course_title: {
      type: 'string'
    },
    units_of_credit: {
      type: 'string'
    },
    career: {
      type: 'string'
    },
    faculty: {
      type: 'string'
    },
    faculty_link: {
      type: 'string'
    },
    school: {
      type: 'string'
    },
    school_link: {
      type: 'string'
    },
    course_outline: {
      type: 'string'
    },
    course_outline_link: {
      type: 'string'
    },
    campus: {
      type: 'string'
    },
    eftsl_link: {
      type: 'string'
    },
    indicative_contact_hours_per_week: {
      type: 'string'
    },
    enrolment_requirements: {
      type: 'string'
    },
    css_contribution_charge_link: {
      type: 'string'
    },
    tuition_fee_link: {
      type: 'string'
    },
    class_timetable_link: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    class_detail: [{
      class_nbr: {
        type: 'string'
      },
      section: {
        type: 'string'
      },
      teaching_period: {
        type: 'string'
      },
      activity: {
        type: 'string'
      },
      status: {
        type: 'string'
      },
      capacity: {
        type: 'string'
      },
      offering_period: {
        type: 'string'
      },
      meeting_dates: {
        type: 'string'
      },
      census_date: {
        type: 'string'
      },
      instruction_mode: {
        type: 'string'
      },
      consent: {
        type: 'string'
      },
      day: {
        type: 'string'
      },
      time: {
        type: 'string'
      },
      location: {
        type: 'string'
      },
      weeks: {
        type: 'string'
      },
      instructor: {
        type: 'string'
      }
    }]
  },
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK:false,
  tableName: 'courses'
}
