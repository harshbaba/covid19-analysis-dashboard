var express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  routes = require('./routes'),
  hbs = require('hbs'),
  appRoot = require('app-root-path');

var mongoose    = require('mongoose');
var app = express();
var port = process.env.PORT || 5000;
var config = require('./config'); // get our config file

mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
var hbsLoader = hbs.create();
app.engine('html', hbsLoader.__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


for(var i = 0; i < routes.routeList.length; i++){
  app.use(routes.routeList[i].routePoint, require(routes.routesDir+routes.routeList[i].file));
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.listen(port,function(){
  console.log('MyToll HTML Server Starter on port '+port+' \n http://localhost:'+port+'');
});