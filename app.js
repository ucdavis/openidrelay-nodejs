
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  //app.set('views', __dirname + '/views'); //=> default
  //app.set('view engine', 'jade');
  app.set('view engine', 'ejs');
  //app.set('view options', {layout: false});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  //app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public')); //=> static files under public
});

/*
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});
*/

// Routes
/*
app.get('/', function(req, res){
    res.send('Hello World');
});
*/
app.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

app.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  });
});

app.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Contact'
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(process.env.PORT);
  console.log("Express server listening on port %d", app.address().port);
}