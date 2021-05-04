var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var connection = mysql.createConnection({
    host     : 'remotemysql.com',
	port	 : '3306',
    user     : 'Vzy22Pgnp5',
    password : 'gkM63NE4Og',
    database : 'Vzy22Pgnp5'
});

var app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/auth', function(request, response) {
	console.log(request.body);
	var userEmail = request.body['user-email'];
	var userPassword = request.body['user-password'];
	var accountType = request.body['account-type'];
	if (userEmail && userPassword) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [userEmail, userPassword], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.userEmail = userEmail;
				console.log('login is ' + request.session.loggedin);
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/login', (req,res) => {
	console.log(req.session.loggedin);
	req.session.loggedin = false;
	console.log(req.session.loggedin);
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/signup', (req,res) => {
	console.log(req.session.loggedin);
	req.session.loggedin = false;
	console.log(req.session.loggedin);
    res.sendFile(path.join(__dirname + '/signup.html'));
});

app.get('/home', (req,res) => {
	if (req.session.loggedin) {
		res.redirect('/homepage.html');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

app.get('/course-search', (req,res) => {
	if (req.session.loggedin) {
		res.redirect('/course-search.html');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

app.get('/course-planner', (req,res) => {
	if (req.session.loggedin) {
		res.redirect('/course-planner.html');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});

app.get('/course-enrollment', (req,res) => {
	if (req.session.loggedin) {
		res.redirect('/course-enrollment.html');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
});


app.listen(3000);