
const connectToDatabase = require('../config/db');

const adicionarConsulta = async (req, res) => {
    const { usuario_id, data, descricao } = req.body;

    if (!usuario_id || !data || !descricao) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos.' });
    }

    try {
        const connection = await connectToDatabase();
        const query = 'INSERT INTO consultas (usuario_id, data, descricao) VALUES (?, ?, ?)';
        const [result] = await connection.execute(query, [usuario_id, data, descricao]);

        return res.status(201).json({ message: 'Consulta adicionada com sucesso!', consultaId: result.insertId });
    } catch (error) {
        console.error('Erro ao adicionar consulta:', error);
        return res.status(500).json({ message: 'Erro ao adicionar consulta.' });
    }
};

module.exports = {
    adicionarConsulta
};
