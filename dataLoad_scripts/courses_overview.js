var request = require('request');
var cheerio = require('cheerio');// extraction library
var async = require('async');

// list of urls related to careers --> ref. to hnadbook
var url_list = [{
	url: 'http://www.handbook.unsw.edu.au/vbook2017/brCoursesByAtoZ.jsp?StudyLevel=Undergraduate&descr=All',
	career: 'undergraduate'
}, {
	url: 'http://www.handbook.unsw.edu.au/vbook2017/brCoursesByAtoZ.jsp?StudyLevel=Postgraduate&descr=All',
	career: 'postgraduate'
}, {
	url: 'http://www.handbook.unsw.edu.au/vbook2017/brCoursesByAtoZ.jsp?StudyLevel=Research&descr=All',
	career: 'research'
}];

var MongoClient = require('mongodb').MongoClient;
var db_url = "mongodb://localhost:27017/handbook";


//function to retrive info. from handbook
var parse_url = function(url, career, db_handle) {
	var courseList = [];
	var courseCount = 0;
	var limiterCount = 2;
	
    //check if there is connection
	request(url, function(error, response, html) {
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(html);
                // check for html tag == td
			$('td').each(function(index, element) {
				var content = element.children[0].data
				if (content !== undefined) {
					if (index == limiterCount) {
						limiterCount += 3;
                        courseList[courseCount].units_of_credit = content; // add UOC
                        courseList[courseCount].career = career; // add career
						courseCount += 1;

                        //Insert into mongoDB
						db_handle.collection('courses').insertOne(courseList[courseCount - 1], function(err, res) {
							if (err) throw err;
							console.log("document inserted");
							console.log(courseList[courseCount - 1]);
						});

                    } else {// add course code
						courseList[courseCount] = {};
						courseList[courseCount].code = content;
					}
                } else {//add course title
					var title = element.children[0];
					courseList[courseCount].handbook_link = title.attribs.href;
					courseList[courseCount].course_title = title.children[0].data;
				}
			});
		}
	});
};

//add data if any to MongoDB
MongoClient.connect(db_url, function(err, db) {
	if (err) throw err;

	async.series(
		[
			function(callback) {
				url_list.forEach(function(item) {
					parse_url(item.url, item.career, db);
				});
			},
			function(callback) {
				db.close();
			}
		],
		function(err, results) {
			console.log('series done');
		}
	);
});
