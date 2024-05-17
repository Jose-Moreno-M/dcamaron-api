const mysql = require('mysql2');

const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '123456',
    database: 'd_camaron'
});
db.connect(function(err){
    if(err) throw err;
    console.log("DATABASE CONNECTED");
});

module.exports = db;