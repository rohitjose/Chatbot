var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/handbook";
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

var connection_handle = {};

let label_tags = ['Class Nbr', 'Section', 'Teaching Period', 'Activity',
	'Lecture', 'Status', 'Enrols/Capacity', 'Offering Period', 'Meeting Dates',
	'Census Date', 'Instruction Mode', 'Consent', 'Day', 'Time', 'Location',
	'Weeks', 'Instructor'
];

// Removed the ':' sign trims the values to
// form the attribute name value
var clean_attribute = function(attribute) {
	attribute = attribute.toLowerCase();
	attribute = attribute.replace(/:/g, "");
	attribute = attribute.replace(/ /g, "_");
	if (attribute === 'enrols/capacity')
		attribute = "capacity";
	return attribute;
};

var update_element = function(class_detail, object_id, details_page_link) {
	try {
		connection_handle.collection('courses').update({
			"_id": object_id
		}, {
			"$push": {
				"class_detail": class_detail
			}
		}, function(err, result) {
			if (err) throw err;
			else {
				console.log("Update called for record: " + object_id);
			}

		});
	} catch (err) {

		console.log("Update error for: " + details_page_link);
	}
};


var parse_url = function(details_page_link, object_id, connection_handle) {
	request(details_page_link, function(error, response, html) {
		if (error) {
			parse_url(details_page_link, object_id, connection_handle);
		}
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(html);
			var class_detail = {};
			var label = "";
			var queue = [];
			var queue_monitor = false;
			var class_detail = {};

			$('table tbody tr td', '.formBody').each(function(index, element) {
				// console.log(index);
				var link = undefined;

				if ((element.attribs.class === 'label' || element.attribs.class === 'tableHeading') && element.children[0]) {
					// Extract the label value
					if (element.children[0].type === 'tag') {
						label = element.children[0].children[0].data;
						link = element.children[0].attribs.href;
					} else {
						label = element.children[0].data;
						link = undefined;
					}

					// Check if the value matches configured value for extraction
					if (label && label === label_tags[0]) {
						queue_monitor = true;
						console.log("#################### START #################");
					}
					if (queue_monitor && label_tags.includes(label)) {
						queue.push(clean_attribute(label));
					}
					if (label && label === 'Class Notes') {
						queue_monitor = false;
						// console.log(class_detail);
						update_element(class_detail, object_id, details_page_link);
						console.log("#################### END  #################");
						class_detail = {};
					}
				} else if (element.attribs.class === 'data' && element.children[0] && element.children[0].name === 'font') {
					try {
						var data = element.children[0].children[0].data;
					} catch (err) {
						// console.log(element.children[0].children[0]);
						// console.log(element.children[0]);
					}
					if (data && queue.length > 0) {
						var selected_label = queue.shift();
						// console.log(selected_label + " : " + data);
						class_detail[selected_label] = data;
						if (link) {
							class_detail[selected_label + "_link"] = link;
						}
					}
				} else if (element.attribs.class === 'data' && element.children[0]) {
					var data = element.children[0].data;
					if (data && queue.length > 0) {
						var selected_label = queue.shift();
						// console.log(selected_label + " : " + data);
						class_detail[selected_label] = data;
						if (link) {
							class_detail[selected_label + "_link"] = link;
						}
					}
				}

			});



		}
	});
};

// parse_url("http://timetable.unsw.edu.au/2017/COMP9323.html", '', '');
MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	connection_handle = db;

	db.collection("courses").find({
		'class_detail': {
			$exists: false
		}
	}).toArray(function(err, result) {
		if (err) throw err;
		console.log(result.length);
		for (var i = 0; i < result.length; i++) {
			var details_page_link = result[i].class_timetable_link;
			var object_id = ObjectID(result[i]._id);
			parse_url(details_page_link, object_id, connection_handle);
			// console.log("Function called for record: " + object_id);
		}
	});
});