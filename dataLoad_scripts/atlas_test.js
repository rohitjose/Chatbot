var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://middleware:B9GnO7PCcfsyQ8qH@mongocluster-shard-00-00-zyzns.mongodb.net:27017,mongocluster-shard-00-01-zyzns.mongodb.net:27017,mongocluster-shard-00-02-zyzns.mongodb.net:27017/handbook?ssl=true&replicaSet=MongoCluster-shard-0&authSource=admin";
MongoClient.connect(uri, function(err, db) {
	if (err) console.log(err);
	else {
		console.log("Connection Successful!!!!");

		db.collection("courses").find({
			"code": "COMP9024"
		}).toArray(function(err, result) {
			if (err) throw err;
			console.log(result);

		});
	}
	db.close();
});