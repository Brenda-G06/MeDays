const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const connectToDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'BrendaGomes', 
            password: 'teste@123',  
            database: 'mddb'  
        });
        return connection;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error;
    }
};

module.exports = connectToDatabase;
