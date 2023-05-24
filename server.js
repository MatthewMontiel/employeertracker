const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3001,
  user: 'root',
  password: '',
  database: 'workersDB'
});

connect.connect(function (err) {
    if (err) throw err;
    console.log("")
})