var express = require('express');					// our app framework
var session = require('express-session');		// our session manager
var bodyParser = require('body-parser');		// to parse data from request body
var mongoose = require('mongoose');			// database
var app = express();										// our app object
var http = require('http').Server(app);			// our http server
var path = require('path');								// path to resources
var config = require('./config');						// our config file

app.use(express.static(path.join(__dirname + '/public')));											// our static resource directory
app.use(bodyParser.urlencoded({extended: false}));												// body parser options
app.use(bodyParser.json());
app.use(session({secret: config.secret, resave: true, saveUninitialized: true}));		// setting up sessions

mongoose.connect(config.database);					
app.set('secret', config.secret);																	// configure our secret key

var hourSchema = new mongoose.Schema({
	date: Date,
	owner: String,
	time: String,
	job: String
});
var hourModel = mongoose.model('hourModel', hourSchema);

var jobSchema = new mongoose.Schema({
	name: String,
	color: String,
	totalHours: Number
});
var jobModel = mongoose.model('jobModel', jobSchema);

var personSchema = new mongoose.Schema({
	name: String
});
var personModel = mongoose.model('personModel', personSchema);

// Start up the server
http.listen(80, function() {
	console.log("listening on *:80");
});

app.post('/newHours', function(req, res) {
	var newHourBuffer = [];
	for (var i = 0; i < req.body.hours.length; i++) {
		newHourBuffer.push(req.body.hours[i]);
	}
	for (var i = 0; i < newHourBuffer.length; i++) {
		var newHour = newHourBuffer[i];
		var data = new hourModel({
			date: newHour.date, 
			owner: newHour.owner, 
			time: newHour.time, 
			job: newHour.job
		});

		// just using save
		data.save();
	}
	res.send(true);
});

app.post('/deleteHours', function(req, res) {
	var deleteHourBuffer = [];
	for (var i = 0; i < req.body.hours.length; i++) {
		deleteHourBuffer.push(req.body.hours[i]);
	}
	for (var i = 0; i < deleteHourBuffer.length; i++) {
		var tmpHour = deleteHourBuffer[i];
		hourModel.remove({
			date: tmpHour.date, 
			owner: tmpHour.owner, 
			time: tmpHour.time, 
			job: tmpHour.job
		}, function(err) {
			if (err) {
				console.log(err);
			}
		});
	}
	res.send(true);
});

app.post('/newPerson', function(req, res) {
	var newPerson = req.body.person;
	var data = new personModel({
		name: newPerson
	});
	data.save(function(err, doc) {
		if (err) console.log(err);
	});
	res.send(true);
});

app.post('/newJob', function(req, res) {
	var newJob = req.body.job;
	var data = new jobModel({
		name: newJob.name,
		color: newJob.color,
		totalHours: newJob.totalHours
	});
	data.save(function(err, doc) {
		if (err) console.log(err);
	});
	res.send(true);
});

app.post('/getSchedule', function(req, res) {
	hourModel.find(function(err, docs) {
		if (err) {
			console.log(err);
			res.send(false);
		}
		res.send(docs);
	});
});

app.post('/getPeople', function(req, res) {
	personModel.find(function(err, docs) {
		if (err) {
			console.log(err);
			res.send(false);
		}
		for (var i=0; i < docs.length; i++) {
		}
		res.send(docs);
	});
});

app.post('/getJobs', function(req, res) {
	jobModel.find(function(err, docs) {
		if (err) {
			console.log(err);
			res.send(false);
		}
		res.send(docs);
	});
});


