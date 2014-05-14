var express = require('express'),
   fs = require('fs'),
   routes = require('./routes'),
   mongoose = require('mongoose'),
   //user = require('./routes/user'),
   http = require('http'),
   csv = require('csv'),
   path = require('path');
var mongo = require('mongodb');
var mongood = require('mongoose');
var monk = require('monk');
var records = new Array();
var app = express();
var records = [];
var db = monk('localhost:27017/project');
//var db = mongoose.connect('mongodb://localhost:27017/project');
csv(records)
   .from.stream(fs.createReadStream(__dirname + '/life.csv'), {
   columns: true
})
   .on('record', function (row, index) {
   records.push(row);

   //console.log(row);
})
   .on('end', function (count) {
   var MongoClient = require('mongodb').MongoClient;
   // Connect to the db
   MongoClient.connect("mongodb://localhost:27017/project", function (err, db) {
      var collection = db.collection('life')
      collection.insert(records, function (err, doc) {
         console.log(doc);
      });
   });
   console.log('Number of lines: ' + count);
});

var env = process.env.NODE_ENV || 'development';
//var config = require('./config/config')[env];

//Bootstrap db connection
mongoose.connect('mongodb://localhost/project');
require('./models/both');
require('./models/female');
require('./models/male');

//var Both = mongoose.model("Both");
//var Female = mongoose.model("Female");
//var Male = mongoose.model("Male");

var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
