var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var config = require('./config');

var db = mysql.createConnection({
	host: config.host,
	user: config.user,
	password: config.password,
	database: config.dbname
});
db.connect(function(err) {
	if (err) {
		return console.error('error on connecting to db: ' + err.message);
	}
	console.log('connected to the db.');
});

var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

<<<<<<< HEAD


app.get('/test', function(req, res, next) {
	db.query('SELECT * FROM Suppliers',
		(err, results) => {
			res.status(200).send(JSON.stringify(results));
		}
	);
});
=======
app.use('/', indexRouter);
app.use('/users', usersRouter);

>>>>>>> 6185ddbe1b5a197eeb01e3e9fd0a94e7022785ab

function goodLogin(uname, pass, table) {
	for (val in table) {
		if (val.Login == uname && val.Password == pass) {
			return true;
		}
	}
	return false;
}

app.post('/auth', function(req, res, next) {
	console.log(req.body);
	var username = req.username;
	var password = req.password;
	res.test= 1;

	if (username && password) {
		db.query("SELECT * FROM 'Manager'",
			(err, results) => {
				if (goodLogin(username, password, results)) {
					req.session.loggedin = true;
					req.session.username = username;
					res.redirect('/game.html');
				} else {
					res.send('Incorrect Username and/or Password!');
				}
				res.end();
			}
		);
	} else {
		res.send('Please enter a Username and Password!');
		res.end();
	}
});

app.get('/gameData', function (req, res, next) {
	if (req.session.loggedin) {
		var data;
		db.query("SELECT DISTINCT * FROM Employees e, Groups g, Works_on w WHERE ? = e.Login AND e.Gid = g.Gid AND w.Eid = e.Eid", [req.session.username], (errEmps, resEmps) => {
			data.emps = resEmps;
			db.query("SELECT DISTINCT * FROM Projects p, Tasks t, Client c WHERE ? = p.Login AND p.Pid = t.Pid AND c.Pid, p.Pid", (errWo, resProj) => {
				data.works_on = resProj;
				res.status(200).send(JSON.stringify(data));
			});
		});
	} else {
		res.redirect('/');
	}
});

<<<<<<< HEAD
app.use(express.static(path.join(__dirname, 'public')));
=======
app.post('/register', function(req,res,next) {
	var username = req.body.username;
	var password = req.body.password;

	if (username && password) {
		db.query("SELECT * FROM Manager WHERE Login = ?", [username], (err, results) => {
			if (results.length > 0) {
				res.status(200).send("Sorry, that username is already taken!");
			} else {
				db.query("INSERT INTO Manager(Login, Password) VALUES('?', '?')", [username, password], (err, results) => {
					if (err) {
						return console.error(err.message);
					}
				});
			}
		});
	}
});

app.post('newEmployee', function(req, res, next) {
	if (req.session.loggedin) {
		db.query("INSERT INTO Manager('name', 'str', 'int', 'cha', 'description', 'wage', 'Login', 'Gid') VALUES('?', '?', '?', '?', '?', '?', '?')",
			[req.body.name, req.body.str, req.body.int, req.body.cha, req.body.desc, req.body.wage, req.session.username, req.body.gid], (err, results) => {
			if (err) {
				return console.error(err.message);
			}
		});
	}
});
>>>>>>> 6185ddbe1b5a197eeb01e3e9fd0a94e7022785ab

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
