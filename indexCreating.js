
const MongoClient = require('mongodb').MongoClient;
//const urlll = "mongodb://localhost:27017/";
const urlll = "mongodb://junta:rootjunta123@ds163850.mlab.com:63850/insurance_db";

MongoClient.connect(urlll, function(rr, db) {
    if (rr) {isfound=false; return;};
    var dbo = db.db("insurance_db");
     dbo.createIndex("insurance",{ PLANNAME:'text', CARRIER:'text',ST:'text'},function(err,op) {
       console.log(err);
     });

 });
