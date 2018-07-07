var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "student", password "student",
// and to the database "chat".

exports.connection = mysql.createConnection({
  host      : 'localhost',
  user      : 'student',
  password  : 'student',
  database  : 'chat' 
})

connection.connect();

connection.query('SELECT * FROM messages', function(err, rows, cols){
  if (err){
    console.log('there has been an error');
  }
  console.log('The message in the first column is' + rows[0].message)
})

connection.end();
