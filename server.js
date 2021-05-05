var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

var db_config = {
	host     : 'remotemysql.com',
	port	 : '3306',
    user     : 'Vzy22Pgnp5',
    password : 'gkM63NE4Og',
    database : 'Vzy22Pgnp5'
}

var connection;
function handleReconnection() {

	connection = mysql.createConnection(db_config);
	connection.connect((error) => {            
		if(error) {                                     
		  console.log('Error experienced while connecting to database:', error);
		  setTimeout(handleReconnection, 2000);
		}                                     
	});

	connection.on('error', (error) => {
		console.log('Database error: ', error);
		if(error.code === 'PROTOCOL_CONNECTION_LOST') { 
		  handleReconnection();                         
		} else {                                      
		  throw error;                                  
		}
	  });
};
handleReconnection();

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

app.post('/auth', (req,res) => {
	console.log(req.body);
	//grab the field inputs
	var userEmail = req.body['user-email'];
	var userPassword = req.body['user-password'];
	var accountType = req.body['account-type'];
	if (userEmail && userPassword && accountType) {
		connection.query('SELECT * FROM accounts WHERE user_email = ? AND user_password = ? AND user_type = ?', [userEmail, userPassword, accountType], (error, results, fields) => {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.userEmail = userEmail;
				req.session.accountType = accountType;
				console.log('login is ' + req.session.loggedin);
				res.redirect('/home');
			} else {
				res.redirect('/incorrect-user');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

app.post('/register', (req,res) => {
	console.log(req.body);
	//grab the field inputs
	var firstName = req.body['first-name'];
	var lastName = req.body['last-name'];
	var userEmail = req.body['user-email'];
	var confirmUserEmail = req.body['confirm-user-email'];
	var userPassword = req.body['user-password'];
	var confirmUserPassword = req.body['confirm-user-password'];
	var accountType = req.body['account-type'];
	//check if emails and passwords match
	console.log("user email and passwords match:" + (userEmail === confirmUserEmail && userPassword === confirmUserPassword));

	//check if user email already exists in the database
	if (userEmail) {
		connection.query('SELECT * FROM accounts WHERE user_email = ?', userEmail, (error, results, fields) => {
			if (results.length > 0) {
				console.log("Email already exists!");
				res.redirect('/email-exists');
			} else {
				if (userEmail === confirmUserEmail && userPassword === confirmUserPassword) {

					//insert into accounts table
					connection.query('INSERT INTO accounts (user_email, user_password, user_type) VALUES ( ?, ?, ?)', [userEmail, userPassword, accountType], (error, results, fields) => {
						if (error) throw error;
						console.log("1 record inserted into accounts");		
						res.end();
					});
					//insert into students table
					connection.query('INSERT INTO students (user_ID, first_name, last_name) VALUES (LAST_INSERT_ID(), ?, ?)', [firstName, lastName], (error, results, fields) => {
						if (error) throw error;
						console.log("1 record inserted into students");		
						res.end();
					});
					res.redirect('/login');
				} else {
					console.log("Email/Passwords don't match!");
					res.redirect('/mismatched-email-password');
				}
			}		
			res.end();
		});
	}
	else {
		res.send('Please enter Username and Password!');
		res.end();
	}
})

app.get('/login', (req,res) => {
	console.log("login session is " + req.session.loggedin);
	req.session.loggedin = false;
	console.log("login session is " + req.session.loggedin);
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/signup', (req,res) => {
	console.log("login session is " + req.session.loggedin);
	req.session.loggedin = false;
	console.log("login session is " + req.session.loggedin);
    res.sendFile(path.join(__dirname + '/signup.html'));
});

app.get('/incorrect-user', (req,res) => {
	res.sendFile(path.join(__dirname + '/incorrect-user.html'));
});

app.get('/email-exists', (req,res) => {
	res.sendFile(path.join(__dirname + '/email-exists.html'));
});

app.get('/mismatched-email-password', (req,res) => {
	res.sendFile(path.join(__dirname + '/mismatched-email-password.html'));
});

app.get('/home', (req,res) => {
	console.log("you are on home page");
	console.log("login session is " + req.session.loggedin);

	if (req.session.loggedin) {
		res.redirect('/homepage.html');
	} else {
		res.redirect('/login-error.html');
	}
	res.end();
});

app.get('/course-search', (req,res) => {
	console.log("you are on course search");
	console.log("login session is " + req.session.loggedin);

	if (req.session.loggedin) {
		res.redirect('/course-search.html');
	} else {
		res.redirect('/login-error.html');
	}
	res.end();
});

app.get('/course-planner', (req,res) => {
	console.log("you are on course planner");
	console.log("login session is " + req.session.loggedin);

	if (req.session.loggedin) {
		res.redirect('/course-planner.html');
	} else {
		res.redirect('/login-error.html');
	}
	res.end();
});

app.get('/course-enrollment', (req,res) => {
	console.log("you are on course enrollment");
	console.log("login session is " + req.session.loggedin);

	if (req.session.loggedin) {
		res.redirect('/course-enrollment.html');
	} else {
		res.redirect('/login-error.html');
	}
	res.end();
});

app.get('/manage-courses', (req,res) => {
	console.log("you are on course search");
	console.log("login session is " + req.session.loggedin);
	console.log(req.session.accountType);

	if (req.session.loggedin && req.session.accountType === 'faculty') {
		res.redirect('/manage-courses.html');
	} 
	else if (req.session.accountType != 'faculty') {
		res.redirect('/manage-courses-error.html');
	}
	else {
		res.redirect('/login-error.html');
	}
	res.end();
});


app.listen(3000);