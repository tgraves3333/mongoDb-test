module.exports = function(app, dbs) {
  
  app.get('/', function(req, res){
    res.send("Theo's PoC - SalesGear/TalentGear API");
  });

  app.get('/testCollection', function(req, res){

    dbs.collections.collection('Users').find({}).toArray(function(err, docs){
      if (err) {
        console.log(err)
        res.error(err)
      } else {
        console.log("testing")
        res.json(docs)
      }
    })
  })

 app.get('/test', function(req, res){

    dbs.collections.collection('Users').find({"Oprid":"TAMMUD01"}).project({ "SGAccess": 1, "TGAccess": 1}).next( function(err, docs){
      if (err) {
        console.log(err)
        res.error(err)
      } else {
        console.log("testing")
        res.json(docs)
      }
    })
  })

 app.get('/test2', function(req, res){

    const doc = dbs.collections.collection('Users')
      .find({"Oprid": "VIGNIO01"})
      .project({ "SGAccess": 1, "TGAccess": 1})
      .next( function(err, doc){
         if (err) {
           console.log(err)
           res.error(err)
         } else {
             console.log("req:=>" + req.originalUrl)
             console.log("req:=>" + req.baseURL)
             console.log("req:=>" + req.app)
             console.log("req:=>" + req.hostname)
             console.log("req:=>" + req.route)
             res.json(doc)
         }
       })
  })

  return app
}