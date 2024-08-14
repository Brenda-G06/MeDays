const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.createUser = async (req, res) => {
    const { nome, email, data_nascimento, senha, telefone, localizacao } = req.body;


    const saltRounds = 10; // Nível de complexidade do hash
    
    bcrypt.hash('senhaDoUsuario', saltRounds, (err, hash) => {
        if (err) throw err;
        console.log('Hash gerado:', hash);
    });
    
    try {
        const hashedPassword = await bcrypt.hash(senha, 10);

        const query = 'INSERT INTO usuarios (nome, email, data_nascimento, senha, telefone, localizacao) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [nome, email, data_nascimento, hashedPassword, telefone, localizacao], (err, results) => {
            if (err) {
                console.error('Erro ao inserir usuário:', err);
                res.status(500).json({ error: 'Erro ao inserir usuário' });
            } else {
                res.status(201).json({ nome, email, data_nascimento, telefone, localizacao });
            }
        });
    } catch (error) {
        console.error('Erro ao hash da senha:', error);
        res.status(500).json({ error: 'Erro ao processar a senha' });
    }
};
