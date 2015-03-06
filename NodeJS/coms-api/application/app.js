
/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
// initialize Passport to secure apps
var passport = require("passport"),
    BasicStrategy = require('passport-http').BasicStrategy;
var methodOverride = require('method-override');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

// Load all API's
var v1api = require('./api/v1/api.js')

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(methodOverride());

// configure passport
app.use(passport.initialize());

// Static public directory
app.use(express.static(path.join(__dirname, 'public')));
// Serve API documentation statically
app.use("/docs",express.static(__dirname+"/../docs"));

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something blew up!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

// development only
if ('development' == app.get('env')) {
    app.use(logErrors);
    app.use(clientErrorHandler);
    app.use(errorHandler);
}

// Configure passport to lock down api
passport.use(new BasicStrategy(
  function(id, secret, done) {
    // connect to database and query against id / secret
    comssecurity.verify(id, secret, function(err, user) {
      if (err) {
        return done(err);
      } else if (!user) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

app.get('/', routes.index);
app.get('/users', user.list);

// send all API calls for v1 to the v1 middleware
app.use('/v1', v1api);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
