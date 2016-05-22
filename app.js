"use strict";
var config = require(__dirname + '/config.js');
var defaultContext = require(__dirname + '/default_context.js');
//requires
var express = require('express');
//set handlebars file extension to .hbs and set default layout to main
var handlebars = require('express-handlebars').create({defaultLayout:'main', extname: '.hbs'});
var bodyParser = require('body-parser');

//setup app
var app = express();
//use public dir for static files
app.use(express.static('public'));

//setup app views
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

//setup body parser for post bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set port
app.set('port', config.port);


//routes
app.get('/',function(req,res){
	var context = defaultContext;
	context.partial_context = {};
	context.partial_context.data = [{key: 'hello', value: 'something'}];
	res.render('default', context);
});


//default route when nothing else matches
app.use(function(req,res){
  res.status(404);
  res.render('404');
});


//start app
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});