var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/handbook";
var request = require('request');
var cheerio = require('cheerio');
var async = require('async');

var connection_handle = {};

// Removed the ':' sign trims the values to
// form the attribute name value
var clean_attribute = function(attribute) {
	attribute = attribute.toLowerCase();
	attribute = attribute.replace(/:/g, "");
	attribute = attribute.replace(/ /g, "_");
	return attribute;
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

			$('table tbody tr td', '.formBody').each(function(index, element) {
				// console.log(index);
				if ((element.attribs.class === 'label' || element.attribs.class === 'tableHeading') && element.children[0]) {
					label = element.children[0].data;
					if (label)
						console.log(" Label: " + element.children[0].data);
				} else if (element.attribs.class === 'data' && element.children[0]) {
					var data = element.children[0].data;
					if (data)
						console.log(" Data: " + element.children[0].data);
				}
			});



		}
	});
};

parse_url("http://timetable.unsw.edu.au/2017/COMP9323.html", '', '');