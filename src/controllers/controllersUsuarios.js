const bcrypt = require('bcrypt');
const connectToDatabase = require('../config/db'); 


exports.createUser = async (req, res) => {
    const { nome, email, data_nascimento, senha, telefone, localizacao } = req.body;
    const saltRounds = 10;

    if (!nome || !email || !data_nascimento || !senha) {
        return res.status(400).json({ error: 'Nome, email, data de nascimento e senha são obrigatórios.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(senha, saltRounds);
        const connection = await connectToDatabase();

        const query = 'INSERT INTO usuario (nome, email, data_nascimento, senha, telefone, localizacao) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await connection.execute(query, [nome, email, data_nascimento, hashedPassword, telefone || null, localizacao || null]);

        res.status(201).json({ 
            id: result.insertId, 
            nome, 
            email, 
            data_nascimento, 
            telefone, 
            localizacao 
        });
    } catch (error) {
        console.error('Erro ao processar a criação do usuário:', error);
        res.status(500).json({ error: 'Erro ao criar o usuário' });
    }
};


exports.getUserByUserName = async (req, res) => {
    const userName = req.params.userName;

    try {
        const connection = await connectToDatabase();

        const query = 'SELECT id, nome, email, data_nascimento, telefone, localizacao FROM usuario WHERE nome = ?';
        const [rows] = await connection.execute(query, [userName]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao buscar o usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar o usuário.' });
    }
};
