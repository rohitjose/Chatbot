var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/handbook";
var fs = require('fs');

var vary_string = function(code) {
	let variants = [];
	var str = code;
	var search = str.search(/\d/);

	let pre_code = str.substring(0, search);
	let post_code = str.substring(search, str.length);
	variants.push(pre_code.toLowerCase() + " " + post_code);
	variants.push(pre_code + " " + post_code);

	return variants;

};

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	connection_handle = db;

	db.collection("courses").find().toArray(function(err, result) {
		if (err) throw err;
		let course_code = [];
		for (var i = 0; i < result.length; i++) {
			var code_entity = {};
			code_entity.value = result[i].code;
			code_entity.synonyms = [];
			code_entity.synonyms.push(result[i].code);
			code_entity.synonyms.push(result[i].code.toLowerCase());
			code_entity.synonyms.push(...vary_string(result[i].code));
			course_code.push(code_entity);
		}

		// console.log(course_code);
		var jsonData = JSON.stringify(course_code);

		fs.writeFile("course_code.json", jsonData, function(err) {
			if (err) {
				return console.log(err);
			}
		});
	});
});