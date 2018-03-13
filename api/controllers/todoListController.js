'use strict';

var mongoose = require('mongoose');
var sleep = require('sleep');
var atob = require('atob');

var debug = require('../utils/debug');

var Task = mongoose.model('Tasks');
var Name = mongoose.model('Names');

exports.list_all_tasks = function(req, res) {
	Task.find({}, function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	});
};

exports.create_a_task = function(req, res) {
	var new_task = new Task(req.body);
	new_task.process = process.pid;
	new_task.save(function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	});
};

exports.read_a_task = function(req, res) {
	Task.findById(req.params.taskId, function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	});
};

exports.update_a_task = function(req, res) {
	Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
		if (err)
			res.send(err);
		res.json(task);
	});
};

exports.delete_a_task = function(req, res) {
	Task.remove({
		_id: req.params.taskId
	}, function(err, task) {
		if (err)
			res.send(err);
		res.json({ message: 'Task successfully deleted by: ' + process.pid});
	});
};

exports.list_all_names = function(req, res) {
	Name.find({}, function(err, name) {
		if (err) res.send(err);
		res.json(name);
	});
};

exports.create_a_name = function(req, res) {
	var new_name = new Name(req.body);
	new_name.save(function(err, name) {
		if (err) res.send(err);
		res.json(name);
	});
};

function prsleep(sec, p)
{
	debug.log('Entering in prsleep()');
	
	let pid = "{ PID: " + process.pid + " }";
	
	p(pid);
	
    var promise = new Promise((resolve, reject) =>
    {
//     	sleep.sleep(sec);
    	
    	setTimeout(() => { resolve(pid); }, sec * 1000);
    });
    
    debug.log('Returning from prsleep()');
    
    return promise;
};

exports.mysleep = function(req, res) 
{
	debug.log('Entering in mysleep()');
	
	let test = {};
	
	let p = (v) => { test = v; };
	
	debug.log(p);
	
	prsleep(3, p).then((pid) => { res.json(test); });
	
	debug.log('Returning from mysleep()');
};

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
//  return JSON.parse(window.atob(base64));
    return JSON.parse(atob(base64));
};

exports.jwt = function(req, res) {
	let jwt = req.params.jwt;
	let pay = parseJwt(jwt);
	console.log('pay = ' + JSON.stringify(pay));
	res.json(pay);
};

