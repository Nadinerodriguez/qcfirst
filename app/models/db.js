var mysql = require('mysql');
const DB_CONFIG = require("../config/db.config.js");

// Create a connection to the database
// var connection;
// function handleReconnection() {

// 	connection = mysql.createConnection(DB_CONFIG);
// 	connection.connect((error) => {            
// 		if(error) {                                     
// 		  console.log('Error experienced while connecting to database:', error);
// 		  setTimeout(handleReconnection, 2000);
// 		}                                     
// 	});

// 	connection.on('error', (error) => {
// 		console.log('Database error: ', error);
// 		if(error.code === 'PROTOCOL_CONNECTION_LOST') { 
// 		  handleReconnection();                         
// 		}
//         else if(error.fatal) {
//             handleReconnection();
//         } else {                                      
// 		  throw error;                                  
// 		}
// 	  });
// };
// handleReconnection();

var pool = mysql.createPool(DB_CONFIG);

module.exports = pool;