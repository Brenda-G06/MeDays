
const mysql = require('mysql2');  //conectar db MYSQL
const dotenv = require('dotenv'); //carregar variaveis de ambiente 

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
});

connection.connect(error => {
    if (error) throw error;  //si n tiver erros na conecao
    console.log('Successfully connected to the database.');
});

module.exports = connection; //exportar para ser usada durante o resto do codigo 
