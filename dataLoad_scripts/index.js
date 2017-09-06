var request = require('request');
var cheerio = require('cheerio');

var courseList = [];
var courseCount = 0;
var limiterCount = 2;
request('http://www.handbook.unsw.edu.au/vbook2018/brCoursesByAtoZ.jsp?StudyLevel=Postgraduate&descr=All', function(error, response, html) {
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);

		$('td').each(function(index, element) {
			var content = element.children[0].data
			if (content !== undefined) {
				if (index == limiterCount) {
					limiterCount += 3;
					courseList[courseCount].units_of_credit = content;
					courseCount += 1;
					console.log(courseList[courseCount - 1]);
					console.log(courseCount);
				} else {
					courseList[courseCount] = {};
					courseList[courseCount].code = content;
				}
			} else {
				var title = element.children[0];
				courseList[courseCount].handbook_link = title.attribs.href;
				courseList[courseCount].course_title = title.children[0].data;
			}
		});
	}
});