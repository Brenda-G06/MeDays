const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

const connectToDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });
        console.log('Conexão com o banco de dados bem-sucedida.');
        return connection;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:');
        console.error('Código do erro:', error.code);
        console.error('Número do erro:', error.errno);
        console.error('Estado do SQL:', error.sqlState);
        console.error('Mensagem do erro:', error.sqlMessage);
        console.error('Stack trace:', error.stack);
    }
};

module.exports = connectToDatabase;
