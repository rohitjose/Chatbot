var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017/handbook";
var fs = require('fs');

MongoClient.connect(url, function(err, db) {
	if (err) throw err;
	connection_handle = db;

	db.collection("courses").find().toArray(function(err, result) {
		if (err) throw err;
		let course_title = [];
		for (var i = 0; i < result.length; i++) {
			var code_entity = {};
			var value = result[i].course_title.replace(/[()]/g, '');
			code_entity.value = value;
			code_entity.synonyms = [];
			code_entity.synonyms.push(value);
			code_entity.synonyms.push(value.toLowerCase());
			course_title.push(code_entity);
		}

		// console.log(course_code);
		var jsonData = JSON.stringify(course_title);

		fs.writeFile("course_title.json", jsonData, function(err) {
			if (err) {
				return console.log(err);
			}
		});
	});
});