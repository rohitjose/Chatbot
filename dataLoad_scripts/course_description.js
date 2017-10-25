var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/handbook";
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

var connection_handle = {};

// Removed the ':' sign trims the values to
// form the attribute name value
//adding another regular expression
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
			parse_url(details_page_link, object_id, connection_handle);
		}
		if (!error && response.statusCode == 200) {
			var $ = cheerio.load(html);
			var course_detail = {};

			$('div', '.internalContentWrapper').each(function(index, element) {
				if (index == 3) {
					try {
						course_detail.description = element.children[0].data;
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
					} catch (err) {

						console.log("No description for: " + details_page_link);
					}
				}
			});



		}
	});
}

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	connection_handle = db;

	db.collection("courses").find({
		'description': {
			$exists: false
		}
	}).toArray(function(err, result) {
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
