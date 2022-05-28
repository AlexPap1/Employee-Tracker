//connection and mysql
const mysql = require('mysql');

let connection;

//Sets up DB to connect locally or on JAWSDB if deployed
//SETUP JAWSDB THROUGH HEROKU ... CONNECT GITHUB
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        port: 3006,
        user: 'root',
        //NEED PASSOWORD
        password: 'password',
        database: 'employee_db'
    })
};

//Export connection
module.exports = connection;