const connectToDatabase = require('../config/db'); 
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

exports.salvarResposta = async (req, res) => {
    const { id_pergunta, resposta } = req.body;
    const data_resposta = new Date();


    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token de autenticação é obrigatório.' });
    }


    let id_usuario;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        id_usuario = decoded.id_usuario;
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido.' });
    }


    if (!id_pergunta || !resposta) {
        return res.status(400).json({ error: 'id_pergunta e resposta são obrigatórios.' });
    }

    try {
        const connection = await connectToDatabase(); 
        const query = 'INSERT INTO resposta (id_usuario, id_pergunta, resposta, data_resposta) VALUES (?, ?, ?, ?)';


        await connection.query(query, [id_usuario, id_pergunta, resposta, data_resposta]); 
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
        const [rows] = await connection.query('SELECT id, pergunta, opcoes FROM pergunta');
        connection.end();


        const formattedPerguntas = rows.map(pergunta => ({
            ...pergunta,
            opcoes: JSON.parse(pergunta.opcoes) 
        }));

        res.json(formattedPerguntas);
    } catch (error) {
        console.error('Erro ao listar perguntas:', error);
        res.status(500).json({ error: 'Erro ao listar perguntas' });
    }
};