const mysql = require("mysql2/promise")
 
connection = mysql.createPool({
    host: '10.111.4.30',
    user: 'dev1b',
    database: 'dev1b',
    password: 'Sen4i2024'
})
 
 
module.exports = connection