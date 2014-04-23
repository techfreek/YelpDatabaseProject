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
		var query = "SELECT name, business_id from yelpproject.business LIMIT 5000"
		connection.query(query, function(err, results) {
			if(err != null) {
				res.end("Database Error: " + err);
			} else {
				res.send(results);
			}
		});
}

exports.q1 = function(req, res) {
	var sort = req.param("sort");
	var cat = req.param("cat");
	var query = "";
	var long = req.param("long");
	var lat = req.param("lat");
	if(sort === "geo") {
		query = "SELECT * FROM yelpproject.category_business WHERE latitude >= (" + lat  + " - 0.1754385965) AND latitude <= (" + lat  + " + 0.1754385965) AND longitude >= (" + long + " - 0.1449275362) AND longitude <= (" + long + " + 0.1449275362) and categoryName = \"" + cat + "\"";
	} else if(sort === "rating"){
		query = "SELECT * FROM yelpproject.category_business WHERE latitude >= (" + lat  + " - 0.1754385965) AND latitude <= (" + lat  + " + 0.1754385965) AND longitude >= (" + long + " - 0.1449275362) AND longitude <= (" + long + " + 0.1449275362) and categoryName = \"" + cat + "\" ORDER BY stars DESC";
	} else {
		query = "SELECT * FROM yelpproject.category_business WHERE latitude >= (" + lat  + " - 0.1754385965) AND latitude <= (" + lat  + " + 0.1754385965) AND longitude >= (" + long + " - 0.1449275362) AND longitude <= (" + long + " + 0.1449275362) and categoryName = \"" + cat + "\" ORDER BY review_count DESC";
	}
	connection.query(query, function(err, results) {
		if(err != null) {
			res.end("Database Error: " + err);
		} else {
			res.send(results);
		}
	});
}

exports.q2june = function(req, res) {
	var query = "select business_name, categoryName from yelpproject.bestbusiness where postDate between '2011-06-01' AND '2011-06-30' group by categoryName order by avg (stars) desc";
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
	var query = "Select business_name, count(*) FROM select business_name, categoryName from yelpproject.bestbusiness where postDate between '2011-06-01' AND '2011-06-30' group by categoryName order by avg (stars) descbestbusiness WHERE (select avg(stars) from bestbusiness where postDate BETWEEN '2012-12-01' AND '2012-12-31' > (select avg(stars) from bestbusiness where postDate BETWEEN '2012-11-01' AND '2012-11-30' > (select avg(stars)from bestbusiness where postDate BETWEEN '2012-10-01' AND '2012-10-31' > (select avg(stars)from bestbusiness where postDate BETWEEN '2012-09-01' AND '2012-09-30' > (select avg(stars) from bestbusiness where postDate BETWEEN '2012-08-01' AND '2012-08-31' > (select avg(stars) from bestbusiness where postDate BETWEEN '2012-07-01' AND '2012-07-30' > (select avg(stars) from bestbusiness where postDate BETWEEN '2012-06-01' AND '2012-06-31' > (select avg(stars) from bestbusiness where postDate BETWEEN '2012-05-01' AND '2012-05-30' > (select avg(stars)  from bestbusiness where postDate BETWEEN '2012-04-01' AND '2012-04-31' > (select avg(stars) from bestbusiness where postDate BETWEEN '2012-03-01' AND '2012-03-30' > (select avg(stars) from bestbusiness where postDate BETWEEN '2012-02-01' AND '2012-02-29' > (select avg(stars) from bestbusiness where postDate BETWEEN '2012-01-01' AND '2012-01-31')))))))))))) group by name;";
	connection.query(query, function(err, results) {
		if(err != null) {
			res.end("Database Error: " + err);
		} else {
			res.send(results);
		}
	});	
}

exports.q3 = function(req, res) {

	var query = "SELECT distinct CONVERT(review USING utf8) as text, (UNIX_TIMESTAMP(postDate)*SQRT(useful+1)) as weight FROM yelpproject.bestbusiness WHERE business_business_id = \"" + req.param("cat") + "\" ORDER BY weight DESC";
	connection.query(query, function(err, results) {
		console.log("Q3 Res: " + results);
		if(err != null) {
			res.end("Database Error: " + err);
		} else {
			res.send(results);
		}
	});
}

exports.q4 = function(req, res) {
	var query = "SELECT DISTINCT name, (POWER(stars, 2)*review_count) as weight FROM yelpproject.business, yelpproject.category WHERE categoryName = \"" + req.param("cat") + "\" ORDER BY weight DESC"
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