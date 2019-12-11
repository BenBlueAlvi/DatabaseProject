var createError = require('http-errors');
var express = require('express');
var mysql = require('mysql');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var config = require('./config');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var db;
app.use((req, res, next) => {
	let conn = mysql.createConnection({
		host: config.host,
		user: config.user,
		password: config.password,
		database: config.dbname
	});
	conn.connect((err) => {
		if (err) return next(err);
		db = conn;
		next();
	})
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/test', function(req, res, next) {
	db.query('SELECT * FROM Suppliers',
		(err, results) => {
			res.status(200).send(JSON.stringify(results));
		}
	);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
