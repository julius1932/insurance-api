const express =require('express');
const morgan =require('morgan');
const bodyParser =require('body-parser');
const cookieParser= require('cookie-parser');
const session= require('express-session');

const MongoClient = require('mongodb').MongoClient;
const urlll = "mongodb://localhost:27017/";


const app =express();

// Middlewares
// set morgan to log info about our requests for development use.
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());
// initialize express-session to allow us track the logged-in user across sessions.

//app.use(session());
// Routes
app.get('/api/insurance',function(req,res){
  console.log('kkkkkkkkkkkkkkkkkkkkkkS ');
  var searchValue =req.query.search;
  console.log(searchValue);
  var query= { $text: { $search: searchValue } };

  MongoClient.connect(urlll, function(rr, db) {
      if (rr) {isfound=false; return;};
      var dbo = db.db("insurance_db");
      dbo.collection("insurance").find(query).toArray(function(errr, reslts) {
          if (errr) {throw errr;return;}
          console.log(reslts);
      });
    })
});
//app.use('/api',require('./routes/routes'));

var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
