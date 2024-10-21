const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

const connectToDatabase = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'mysql.infocimol.com.br',  
            user: 'infocimol19',  
            password: 'Brenda0605119',  
            database: 'infocimol19'  
        });
        return connection;
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw error;
    }
};

module.exports = connectToDatabase;
