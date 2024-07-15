const db = require('../config/db');

exports.createUser = (req, res) => {
    const { nome, email, data_nascimento, localizacao } = req.body;
    const query = 'INSERT INTO usuarios (nome, email, data_nascimento, localizacao) VALUES (?, ?, ?, ?)';
    db.query(query, [nome, email, data_nascimento, localizacao], (err, results) => {
        if (err) {
            console.error('Erro ao inserir usuário:', err);
            res.status(500).json({ error: 'Erro ao inserir usuário' });
        } else {
            res.status(201).json({  nome, email, data_nascimento, localizacao });
        }
    });
};
