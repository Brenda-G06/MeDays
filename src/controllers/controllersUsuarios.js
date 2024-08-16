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
