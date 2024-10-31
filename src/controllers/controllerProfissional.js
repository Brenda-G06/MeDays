const connectToDatabase = require('../config/db');

exports.listarProfissionais = async (req, res) => {
    try {
        const connection = await connectToDatabase(); 
        const [rows] = await connection.query('SELECT * FROM profissional'); 
        connection.end();
        
        res.json(rows);
    } catch (error) {
        console.error('Erro ao listar profissionais:', error);
        res.status(500).json({ error: 'Erro ao listar profissionais' });
    }
};
