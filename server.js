/**
 * Module dependencies.
 */

console.log("starting node with express");

var express = require('express');
var openidmethods = require('./openidmethods');

var app = module.exports = express.createServer();

// Configuration

app.configure(function() {
    //app.set('views', __dirname + '/views'); //=> default
    //app.set('view engine', 'jade');
    app.set('view engine', 'ejs');
    //app.set('view options', {layout: false});
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: "1234"
    }));
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
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Home',
        authenticated: req.session.auth,
        username: req.session.authname
    });
});

app.get('/login', function(req, res) {
    res.render('login', {
        title: 'Login'
    });
});

app.get('/logout', function(req, res) {
    req.session.auth = false;
    res.writeHead(302, {
        Location: '/'
    });
    res.end();
});

app.get('/membersonly', function(req, res) {
    if (req.session.auth) {
        res.render('membersonly', {
            title: "Member's Only",
            username: req.session.authname
        });
    }
    else {
        res.writeHead(302, {
            Location: '/login'
        });
        res.end();
    }

});

app.get('/about', function(req,res){
   res.render('about', {title: 'About'}); 
});

app.get('/authenticate', openidmethods.authenticate);

app.get('/verify', openidmethods.verify);
var port = process.env.port ? process.env.port : process.env.PORT;

app.listen(port);

/*
// Only listen on $ node app.js
if (!module.parent) {
    //app.listen(process.env.PORT);
    //console.log("Express server listening on port %d", app.address().port);
}
*/