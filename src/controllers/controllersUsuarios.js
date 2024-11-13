const bcrypt = require('bcrypt');
const connectToDatabase = require('../config/db'); 
const jwt = require('jsonwebtoken');

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

        const token = jwt.sign(
            { id: result.insertId, nome, email }, 
            'Brenda-Gomes_Projeto_Me_Days0605119', 
            { expiresIn: '1h' }
           
        );
        console.log(token);
        res.status(201).json({ 
            id: result.insertId, 
            nome, 
            email, 
            data_nascimento, 
            telefone, 
            localizacao,
            token
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

exports.loginUser = async (req, res) => {
    const { emailOrPhone, senha } = req.body;

    if (!emailOrPhone || !senha) {
        return res.status(400).json({ error: 'Email/Telefone e senha são obrigatórios.' });
    }

    try {
        const connection = await connectToDatabase();

        const query = 'SELECT id, nome, email, senha, telefone FROM usuario WHERE email = ? OR telefone = ?';
        const [rows] = await connection.execute(query, [emailOrPhone, emailOrPhone]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const user = rows[0];
        const senhaValida = await bcrypt.compare(senha, user.senha);

        if (!senhaValida) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

    
        const token = jwt.sign(
            { id: user.id, nome: user.nome, email: user.email },
            'Brenda-Gomes_Projeto_Me_Days0605119',
            { expiresIn: '1h' }
        );

        res.status(200).json({ nome: user.nome, email: user.email, token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
};


exports.getUserProfile = async (req, res) => {
    const userId = req.userId; 

    try {
        const connection = await connectToDatabase();

        const query = 'SELECT id, nome, email, data_nascimento, telefone, localizacao FROM usuario WHERE id = ?';
        const [rows] = await connection.execute(query, [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao buscar o perfil do usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar o perfil do usuário.' });
    }
};