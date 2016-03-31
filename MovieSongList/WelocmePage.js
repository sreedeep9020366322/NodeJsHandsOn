/**
 * http://usejsdoc.org/
 */

var mongodb = require('mongodb');
var express = require('express');

//var bodyParser = require("body-parser");

var app = express();

var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/HandsOn';

app.use(express.urlencoded());
app.set("view engine","jade");

// connecting with MongoDB
/*
 * MongoClient.connect(url, function (err, db) {
	  
	if (err) {
	
		console.log('Unable to connect to the mongoDB server. Error:', err);
	}
	else {
		
		console.log('Connection established to', url);
	    // do some work here with the database.
		db.collection('movie').find().toArray(function(err,docs) {
			res.send(docs);
		});
	    //Close connection
	    db.close();
	}
});
*/

app.get('/',function (req,res){

	console.log('Got a GET request for the WelcomePage');
	res.sendfile('./views/HomePage.html');
	
	
});


app.get('/movieList',function (req,res){

	MongoClient.connect(url, function (err, db) {
		  
		if (err) {
		
			console.log('Unable to connect to the mongoDB server. Error:', err);
		}
		else {
			
			console.log('Connection established to', url);
			
			//Retreiving from the database
			
			db.collection('Movies').find().toArray(function(err,docs) {
				res.send(docs);
			   // db.close();
			});
		  
		}
	});
	
	
});


var server = app.listen(8081,function () {
	
	
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Example app listening at http://%s:%s",host,port);
	
});


app.get('/songList/:id',function(req,res){
	
	MongoClient.connect(url, function (err, db) {
		  
		if (err) {
		
			console.log('Unable to connect to the mongoDB server. Error:', err);
		}
		else {
			
			console.log('Connection established to', url);
			
			//Retreiving from the database
			
			db.collection('Movies').findOne({movieId:parseInt(req.params.id)},function(err,docs) {
				
				//res.locals.docs=docs;
				//res.render("index");
				res.send(docs);
				
			   // db.close();
			});
		  
		}
	});
});


app.get('/jquery',function(req,res){
	
	console.log("Got a GET request for the homepage");
	res.sendfile('./views/jslibs/jquery-1.12.1.js');
});
