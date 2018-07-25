var async = require('asyncawait/async');
var wait = require('asyncawait/await');

const MongoClient = require('mongodb').MongoClient
 
// Note: A production application should not expose database credentials in plain text.
// For strategies on handling credentials, visit 12factor: https://12factor.net/config.
const URI = "mongodb://app_user:209xm1ga@172.16.136.29:27017/Security?authSource=admin";
 
function connect(url) {
  // return MongoClient.connect(url).then(client => client.db())
  return MongoClient.connect(url, {poolSize: 10}).then(function(client){
  	return client.db()
  })
}
 
module.exports = async (function() {
  let databases = wait (Promise.all([connect(URI)]))

  return {
    collections: databases[0]
  }
})
