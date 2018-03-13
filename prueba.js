var cluster = require('cluster');

if(cluster.isMaster) {
	
    var numWorkers = require('os').cpus().length / 2 + 1;
    
    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for(var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function(worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });
    
    cluster.on('exit', function(worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
    
} else {
	
    var app = require('express')(),
 		port = process.env.PORT || 3000,
 		mongoose = require('mongoose'),
 		Name = require('./api/models/nameModel'), //created model loading here
 		Task = require('./api/models/taskModel'), //created model loading here
 		bodyParser = require('body-parser');

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/Tododb', { useMongoClient: true });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

//  app.all('/*', function(req, res) {res.send('process ' + process.pid + ' says hello!').end();})
    
    var routes = require('./api/routes/todoListRoutes'); //importing route
    routes(app); //register the route

    var server = app.listen(3000, function() {
        console.log('Process ' + process.pid + ' is listening to all incoming requests on:' + port);
    });
}
