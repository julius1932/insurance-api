const csv=require('csvtojson');

const MongoClient = require('mongodb').MongoClient;
//const urlll = "mongodb://localhost:27017/";
const urlll = "mongodb://junta:rootjunta123@ds163850.mlab.com:63850/insurance_db";

var dFiles=[
             'data/individual_issuer_county_report_2014_2018_05_12.csv',
             'data/individual_issuer_county_report_2015_2018_05_12.csv',
             'data/individual_issuer_county_report_2016_2018_05_12.csv',
             'data/individual_issuer_county_report_2017_2018_05_12.csv',
             'data/individual_issuer_county_report_2018_2018_06_01.csv',
             'data/small_group_issuer_county_report_2015_2018_05_12.csv',
             'data/small_group_issuer_county_report_2016_2018_05_12.csv',
             'data/small_group_issuer_county_report_2017_2018_05_12.csv'
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
