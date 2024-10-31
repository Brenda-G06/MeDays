const connectToDatabase = require('../config/db'); 

exports.salvarResposta = async (req, res) => {
    const { id_pergunta, resposta } = req.body;
    const data_resposta = new Date(); 

    if (!id_pergunta || !resposta) {
        return res.status(400).json({ error: 'id_pergunta e resposta são obrigatórios.' });
    }

    try {
        const connection = await connectToDatabase(); 
        const query = 'INSERT INTO resposta (id_pergunta, resposta, data_resposta) VALUES (?, ?, ?)';
        
        await connection.query(query, [id_pergunta, resposta, data_resposta]); 
        connection.end(); 

        res.status(201).json({ message: 'Resposta salva com sucesso!' });
    } catch (error) {
        console.error('Erro ao salvar resposta:', error);
        res.status(500).json({ error: 'Erro ao salvar resposta' });
    }
};

exports.listarPerguntas = async (req, res) => {
    try {
        const connection = await connectToDatabase(); 
        const [rows] = await connection.query('SELECT * FROM pergunta'); 
        connection.end(); 
        res.json(rows);
    } catch (error) {
        console.error('Erro ao listar perguntas:', error);
        res.status(500).json({ error: 'Erro ao listar perguntas' });
    }
};