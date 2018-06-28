const express =require('express');
const morgan =require('morgan');
const bodyParser =require('body-parser');
const cookieParser= require('cookie-parser');
const session= require('express-session');
var path =require('path');
//var exhbs=require('express-handlebars');

const MongoClient = require('mongodb').MongoClient;
//const urlll = "mongodb://localhost:27017/";
const urlll = 'mongodb://junta:rootjunta123@ds117991-a0.mlab.com:17991/heroku_pv94v0fr';
//const urlll = "mongodb://junta:rootjunta123@ds163850.mlab.com:63850/insurance_db";

const app =express();

// Middlewares
// set morgan to log info about our requests for development use.
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// Routes
app.get("/",function(req,res){
	  res.sendFile( __dirname+'/index.html');
 });
app.get('/insurance',function(req,res){
  //var searchValue =req.body.search;
   var searchValue =req.query.search;
   console.log(searchValue);
		 regxz='^'+searchValue+'[a z]*';
		  console.log(regxz);
   if(searchValue){
     var query=  {$text: { $search: regxz}};
     MongoClient.connect(urlll, function(rr, db) {
         if (rr) {isfound=false; return;};
          //var dbo = db.db("insurance_db");//insurance_db
         var dbo = db.db("heroku_pv94v0fr");
         /*dbo.createIndex("insur",{ pn:'text', cr:'text',st:'text',yr:'text', pid:'text',mt:'text'},function(err,op) {
           console.log(err);
         });*/
				 var feilds=['cr','yr','st','mt','pn'];
         dbo.collection("insur").find(query).toArray(function(errr, reslts) {
             if (errr) {throw errr;return;}
						 var arr0,arr1,arr2;
						 arr0=arr1=arr2=[];
						  reslts.forEach(function(row){
								var mtched=false;
								feilds.forEach(function(feild){
									//console.log(row[feild]);
									 if(isNaN(row[feild])&&row[feild].startsWith(searchValue)){
										 mtched=true;
									 }
								 });
								 if(mtched){
									   arr0.push(row);
								 }else {
									  feilds.forEach(function(feild){
   									 if(isNaN(row[feild])&&row[feild].includes(searchValue)){
   										 mtched=true;
   									 }
   								 });
									 if(mtched){
											arr1.push(row);
									 }else{
										 if(mtched){
												arr2.push(row);
										}
									 }
								 }

							 });
							 arr0=arr0.concat(arr1);
						   arr0=arr0.concat(arr2);
             console.log(arr0.length);
             db.close();
              res.jsonp(arr0);
           //  res.render('hom',{results :reslts,num:reslts.length});
         });
       })
   }
});
//app.use('/api',require('./routes/routes'));
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
