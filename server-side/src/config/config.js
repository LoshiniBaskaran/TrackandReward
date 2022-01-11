const mysql = require('mysql');

const db = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"tandrdump",
	multipleStatements: true
});

module.exports = db;