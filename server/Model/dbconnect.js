const mysql = require('mysql');

const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Ecommerce',
    port: 3306
})

connection.connect ( (err) => {
    if (err) {
        console.log('Error', err.sqlMessage)
    }
    else {
        console.log('Database Connected Successfully')
    }
})

module.exports = connection;