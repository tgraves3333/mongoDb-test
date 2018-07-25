var a127 = require('a127-magic');
const express = require('express')
const app = express()

// initialize a127 framework
a127.init(function(config) {

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


console.log(" before attempt to connect to mongodb");

const initializeDatabases = require('./api/dbs/connection.js')
const routes = require('./api/routes/routes.js')

console.log("Node JS APP -- Start UP")
 
// Initialize the application once database connections are ready.
initializeDatabases().then(dbs => {
  // Initialize the application once database connections are ready.
  routes(app, dbs).listen(3000, () => console.log('Listening on port 3000'))
}).catch(err => {
  console.error('Failed to make all database connections!')
  console.error(err)
  process.exit(1)
})

