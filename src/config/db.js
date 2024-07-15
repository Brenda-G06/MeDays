const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
});

connection.connect(error => {
    if (error) throw error;
    console.log('Conexão com o banco de dados bem-sucedida.');
});

module.exports = connection;
