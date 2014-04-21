var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: ""
})

//connection.connect();

exports.categories = function(req, res) {
	var query = "SELECT DISTINCT categoryName from category";
	connection.query(query, function(err, results) {
		if(err != null) {
			res.send("Database Error: + err");
		} else {
			res.send(results);
		}
	})
}

exports.businesses = function(req, res) {
		var query = "SELECT DISTINCT business_id from business"
		connection.query(query, function(err, results) {
			if(err != null) {
				res.end("Database Error: " + err);
			} else {
				res.send(results);
			}
		});
}

exports.q1geo = function(req, res) {
	console.log("Req.body: " + JSON.stringify(req.body));
	console.log("Req.params: " + JSON.stringify(req.params));
	console.log("Req.query: " + JSON.stringify(req.query));
	//Check what element of req the data is coming from
	var qCat = req; //Change to reflect what aspect of the requirement it comes from
	var query = "";
	query = "SELECT * FROM business WHERE latitude >= (" + req.lat  + " - 0.1754385965) AND latitude <= ( " + req.lat + 
		" + 0.1754385965) AND longitude >= (" + req.long + " - 0.1449275362) AND longitude <= (" + req.long + " + 0.1449275362) AND " + req.cat + 
		" = category"
	connection.query(query, function(err, results) {
		if(err != null) {
			res.end("Database Error: " + err);
		} else {
			res.send(results);
		}
	});
}

exports.q1rating = function(req, res) {
	console.log("Req.body: " + JSON.stringify(req.body));
	console.log("Req.params: " + JSON.stringify(req.params));
	console.log("Req.query: " + JSON.stringify(req.query));
	//Check what element of req the data is coming from
	var qCat = req; //Change to reflect what aspect of the requirement it comes from
	var query = "";
	query = "SELECT * from business WHERE category = " + req.category + "ORDER by rating DESC"
	connection.query(query, function(err, results) {
		if(err != null) {
			res.end("Database Error: " + err);
		} else {
			res.send(results);
		}
	});
}

exports.q1review = function(req, res) {
	console.log("Req.body: " + JSON.stringify(req.body));
	console.log("Req.params: " + JSON.stringify(req.params));
	console.log("Req.query: " + JSON.stringify(req.query));
	//Check what element of req the data is coming from
	var qCat = req; //Change to reflect what aspect of the requirement it comes from
	var query = "";
	query = "SELECT * from business WHERE category = " + req.category + "ORDER by reviewCount DESC"
	connection.query(query, function(err, results) {
		if(err != null) {
			res.end("Database Error: " + err);
		} else {
			res.send(results);
		}
	});
}

exports.q2june = function(req, res) {
	var query = "";
	query = "SELECT business_id FROM business as B ORDER BY (" +
				"SELECT avg(stars) FROM Review where B.business_id = Review.business_id AND postDate BETWEEN '2011-06-01' AND '2011-06-30' AND business_id = b.business_id)";
	connection.query(query, function(err, results) {
		if(err != null) {
		res.end("Database Error: " + err);
		} else {
			res.send(results);
		}
	});
}

exports.q2steady = function(req, res) {
	var qCat = req; //Change to reflect what aspect of the requirement it comes from
	var query = "";
	connection.query(query, function(err, results) {
		if(err != null) {
			res.end("Database Error: " + err);
		} else {
			res.send(results);
		}
	});	
}

exports.q3 = function(req, res) {
	var query = "SELECT DISTINCT name, (POWER(stars, 2)*review_count) as weight FROM business, category WHERE categoryName = " + 
				req.cat + "ORDER BY weight DESC"
	connection.query(query, function(err, results) {
		if(err != null) {
			res.end("Database Error: " + err);
		} else {
			res.send(results);
		}
	});
}

exports.q4 = function(req, res) {
	var query = "SELECT *, (UNIX_TIMESTAMP(postDate)*SQRT(useful+1)) as weight FROM tempReview WHERE tempReview.business_id = " + req.business_id +
	 			" ORDER BY weight DESC;"
	connection.query(query, function(err, results) {
		if(err != null) {
			res.end("Database Error: " + err);
		} else {
			res.send(results);
		}
	});
}

exports.q5 = function(req, res) {
	connection.query("SELECT user_id, review, funny FROM Review ORDER BY funny DESC", function(err, results){
		if(err != null) {
			res.end("Database Error: " + err);
		} else {
			res.send(results);
		}
	});
}