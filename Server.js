var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');
var app = express();

var server = http.createServer(app);

app.set('port', process.env.VCAP_APP_PORT || 3000);
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.use("/", express.static(__dirname + '/app'));
app.use("/public", express.static(__dirname + '/public'));
app.use("/node_modules", express.static(__dirname + '/node_modules'));
app.use("/bower_components", express.static(__dirname + '/bower_components'));

/*app.get('/api/q1/rating/:cat/lat/:lat/long/:long', routes.q1rating);
app.get('/api/q1/review/:cat/lat/:lat/long/:long', routes.q1review);
app.get('/api/q1/geo/:cat/lat/:lat/long/:long', routes.q1geo);*/
app.get('/api/q1/:sort/:cat/lat/:lat/long/:long', routes.q1);
app.get('/api/q2/steady', routes.q2steady);
app.get('/api/q2/june', routes.q2june);
app.get('/api/q3/:cat', routes.q3);
app.get('/api/q4/:cat', routes.q4);
app.get('/api/q5', routes.q5);
app.get('/api/categories', routes.categories);
app.get('/api/businesses', routes.businesses);

app.use(function(err, req, res, next) {
	if(!err) return next();
	console.log(err.stack);
	res.json({error: true});
});
	/*app.use("/views/*", function(req, res, next){
		res.sendfile(__dirname + '/app/index.html');
	});*/
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
