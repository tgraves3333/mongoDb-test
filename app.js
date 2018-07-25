'use strict';

var a127 = require('a127-magic');
var express = require('express');
var app = express();

module.exports = app; // for testing


var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var db;

// Initialize connection once
MongoClient.connect("mongodb://app_user:209xm1ga@172.16.136.29:27017/admin", { useNewUrlParser: true }, function(err, database) {
  if(err) {
        console.log("error encountered");
    console.log(err);
    //throw err;
  }
  else{
            console.log("NO error encountered");

 db = database;
 db.on('error', console.error.bind(console, 'MongoDB connection error:' + err));
 db.on('start', console.log.bind(console, 'MongoDB connection started.'));

  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
  }

  console.log(" after attempt to connect to mongodb");
});


// initialize a127 framework
a127.init(function(config) {

  console.log(" before attempt to connect to mongodb");


  // include a127 middleware
  app.use(a127.middleware(config));

  // error handler to emit errors as a json string
  app.use(function(err, req, res, next) {
    if (typeof err !== 'object') {
      // If the object is not an Error, create a representation that appears to be
      err = {
        message: String(err) // Coerce to string
      };
    } else {
      // Ensure that err.message is enumerable (It is not by default)
      Object.defineProperty(err, 'message', { enumerable: true });
    }

    // Return a JSON representation of #/definitions/ErrorResponse
    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(err));
  });

  var ip = process.env.IP || 'localhost';
  var port = process.env.PORT || 10010;
  // begin listening for client requests
  app.listen(port, ip);

  console.log('try this:\ncurl http://' + ip + ':' + port + '/hello?name=Scott');
});
