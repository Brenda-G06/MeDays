const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const connectToDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'BrendaGomes',  // Substitua pelo seu usuário do MySQL
            password: 'teste@123',  // Substitua pela sua senha do MySQL
            database: 'mddb'  // Substitua pelo nome do seu banco de dados
        });
        return connection;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error;
    }
};

module.exports = connectToDatabase;
