require('dotenv').config();
var mysql = require('mysql');

var pool  = mysql.createPool({
  connectionLimit: 10,
  host            : process.env.MYSQL_HOST,
  user            : 'admin',
  password        : process.env.MYSQL_PASSWORD,
  database        : 'mydb',
  multipleStatements: true
});

pool.getConnection((err,connection)=> {
  if(err)
  throw err;
  console.log('Database connected successfully');
  connection.release();
});

module.exports = pool;
