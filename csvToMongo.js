const csv=require('csvtojson');

const MongoClient = require('mongodb').MongoClient;
const urlll = "mongodb://localhost:27017/";
//const urlll = "mongodb://junta:rootjunta123@ds163850.mlab.com:63850/insurance_db";

var dFiles=[
             //'data/plans.csv',
             'data/plans1.csv',
             'data/plans2.csv',
             'data/plans3.csv',
             'data/plans4.csv'
         ];
    dFiles.forEach(function(csvFilePath){
      csv()
      .fromFile(csvFilePath)
      .then((jsonObj)=>{
          console.log(jsonObj.length);
          console.log(csvFilePath);
          MongoClient.connect(urlll, function(err, db) {
             if (err) {isfound=false; return;}
             var dbo = db.db("insurance_db");
             dbo.collection("insurance").insert(jsonObj, function(er, res) {
                   console.log(`1 document inserted. ${jsonObj.length} items  saved so far`);
                   db.close();
              });
            })
      });
    });
