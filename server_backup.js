const express = require('express')
const app = express()

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

