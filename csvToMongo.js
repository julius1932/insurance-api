const csv=require('csvtojson');
const csvFilePath='small.csv';

const MongoClient = require('mongodb').MongoClient;
const urlll = "mongodb://localhost:27017/";

csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
    MongoClient.connect(urlll, function(err, db) {
       if (err) {isfound=false; return;}
       var dbo = db.db("insurance_db");
       dbo.collection("insurance").insert(jsonObj, function(er, res) {
             console.log(`1 document inserted. ${jsonObj.length} items scraped and saved so far`);
        });
      })
})
