var mysql = require('mysql');
var url = require('url');

var connection = mysql.createConnection({
	host: 'localhost',
	port: '3306',
	user: 'root',
	password: 'test',
	database: 'yelpproject'
});

connection.connect(function(err){
	if(err) {
		throw err;
	} else {
		console.log('Connected');
	}
});

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
		var query = "SELECT business_id from yelpproject.business"
		connection.query(query, function(err, results) {
			console.log("Bid: " + JSON.stringify(results));
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
	var cat = req.param("cat");
	var long = req.param("long");
	var lat = req.param("lat");
	query = "SELECT * FROM yelpproject.business, yelpproject.category WHERE business.business_id = category.business_id AND business.latitude >= (" + lat  + " - 0.1754385965) AND business.latitude <= ( " + lat  + "  + 0.1754385965) AND business.longitude >= (" + long + " - 0.1449275362) AND business.longitude <= (" + long + " + 0.1449275362) AND category.categoryName = \"" + cat + "\"";
	connection.query(query, function(err, results) {
		if(err != null) {
			res.end("Database Error: " + err);
		} else {
			res.send(results);
		}
	});
}

exports.q1rating = function(req, res) {
	var cat = req.param("cat");
	query = "SELECT * from yelpproject.business, yelpproject.category WHERE business.business_id = category.business_id AND category.categoryName = \"" + cat + "\" ORDER by business.stars DESC"
	connection.query(query, function(err, results) {
		if(err != null) {
			res.end("Database Error: " + err);
		} else {
			res.send(results);
		}
	});
}

exports.q1review = function(req, res) {
	console.log("Req.params: " + req.param("cat"));
	//Check what element of req the data is coming from
	var cat = req.param("cat");
	query = "SELECT * from yelpproject.business, yelpproject.category WHERE business.business_id = category.business_id AND category.categoryName = \"" + cat + "\" ORDER by business.review_count DESC"
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
	query = "SELECT business_id FROM yelpproject.business as B ORDER BY (" +
				"SELECT avg(stars) FROM Review where B.business_id = Review.business_id AND postDate BETWEEN '2011-06-01' AND '2011-06-30' AND business_id = b.business_id)";
	console.log("June");
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
	connection.query("SELECT CONVERT(review USING utf8) as text, user_name, postDate, funny, stars FROM yelpproject.Review ORDER BY funny DESC LIMIT 1000", function(err, results){
		if(err != null) {
			res.end("Database Error: " + err);
		} else {
			res.send(results);
		}
	});
}