var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/handbook";
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

var connection_handle = {};

// Removed the ':' sign trims the values to
// form the attribute name value
//remove tags
var clean_attribute = function(attribute) {
	attribute = attribute.toLowerCase();
	attribute = attribute.replace(/:/g, "");
	attribute = attribute.replace(/ /g, "_");
	return attribute;
};

var parse_url = function(details_page_link, object_id, connection_handle) {
	// console.log("Function reached for record: " + object_id);
	request(details_page_link, function(error, response, html) {
		if (error) {
			// console.log("########### ERROR ############");
			// console.log(error);
			// console.log(details_page_link);
			// console.log("########### ERROR END ############");
			parse_url(details_page_link, object_id, connection_handle);
		}
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(html);
			var course_detail = {};

			var last_element_index = $('p', '.summary').eq(0).end().length;

			if (last_element_index == 0) {
				console.log(details_page_link);
			}


			$('p', '.summary').each(function(index, element) {
				var child_count = element.children.length;

				// Attributes with links
				if (child_count === 3) {
					var attribute = clean_attribute($(this).find('strong').text());
					if (attribute) {
						if (attribute === 'further_information')
							attribute = 'class_timetable';
						var attribute_link = attribute + '_link';
						var attribute_content = $(this).find('a').text();
						if (attribute_content !== '(more info)' && attribute !== 'tuition_fee' && attribute !== 'class_timetable')
							course_detail[attribute] = attribute_content;

						course_detail[attribute_link] = $(this).find('a').attr('href');
					} else {

					}
				} else if (child_count === 2) {
					var attribute = clean_attribute($(this).find('strong').text());
					if (attribute !== 'career') {
						course_detail[attribute] = element.children[1].data.trim();
					}

				} else if (child_count === 1) {
					var attribute = clean_attribute($(this).find('strong').text());
					if (!attribute) {
						course_detail.enrolment_requirements = element.children[0].data.trim();
					}
				}

				if (index === last_element_index - 1) {
					connection_handle.collection('courses').update({
						'_id': object_id
					}, {
						$set: course_detail
					}, {
						w: 1
					}, function(err, result) {
						if (err) throw err;
						else {
							console.log("Update called for record: " + object_id);
						}

					});
				}

			});


		} 
	});
}

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	connection_handle = db;

	db.collection("courses").find({'class_timetable_link':{$exists:false}}).toArray(function(err, result) {
		if (err) throw err;
		console.log(result.length);
		for (var i = 0; i < result.length; i++) {
			var details_page_link = result[i].handbook_link;
			var object_id = ObjectID(result[i]._id);
			parse_url(details_page_link, object_id, connection_handle);
			// console.log("Function called for record: " + object_id);
		}
	});
});
