const bcrypt = require('bcrypt');
const connectToDatabase = require('../config/db'); 
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
        user: 'projetomedays@gmail.com',  
        pass: 'kapl gsjy cnzg wxre',
    },
});

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

   
        const confirmationLink = `http://localhost:3000/confirm-email?token=${token}`;


        const mailOptions = {
            from: 'seuemail@gmail.com', 
            to: email,  
            subject: 'Confirmação de Cadastro',
            text: `Olá, para confirmar seu cadastro, clique no link abaixo:\n${confirmationLink}`,
        };


        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Erro ao enviar o e-mail:', err);
                return res.status(500).json({ error: 'Erro ao enviar e-mail de confirmação.' });
            }
            console.log('E-mail de confirmação enviado:', info.response);
        });

        
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


        res.status(200).json({ id: user.id, nome: user.nome, email: user.email, token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
};exports.obterCronograma = async (req, res) => {
    const { id_usuario } = req.body; 
    if (!id_usuario) {
        return res.status(400).json({ error: 'id_usuario é obrigatório.' });
    }

    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.query('SELECT cronograma FROM usuario WHERE id = ?', [id_usuario]);
        connection.end();

        if (rows.length === 0 || !rows[0].cronograma) {
            return res.status(404).json({ error: 'Cronograma não encontrado.' });
        }

        res.status(200).json({ cronograma: JSON.parse(rows[0].cronograma) });
    } catch (error) {
        console.error('Erro ao buscar cronograma:', error);
        res.status(500).json({ error: 'Erro ao buscar cronograma' });
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

exports.confirmEmail = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ error: 'Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(token, 'Brenda-Gomes_Projeto_Me_Days0605119');
        const userId = decoded.id;

        const connection = await connectToDatabase();
        
        const query = 'UPDATE usuario SET isConfirmed = 1 WHERE id = ?';
        const [result] = await connection.execute(query, [userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.status(200).json({ message: 'E-mail confirmado com sucesso!' });
    } catch (error) {
        console.error('Erro ao confirmar e-mail:', error);
        res.status(500).json({ error: 'Erro ao confirmar o e-mail.' });
    }
};
exports.updateUserProfile = async (req, res) => {
    const userId = req.userId; 
    const { nome, email, data_nascimento, telefone, localizacao } = req.body;

    if (!nome && !email && !data_nascimento && !telefone && !localizacao) {
        return res.status(400).json({ error: 'Pelo menos um campo deve ser atualizado.' });
    }

    try {
        const connection = await connectToDatabase();

        const query = `
            UPDATE usuario 
            SET 
                nome = COALESCE(?, nome), 
                email = COALESCE(?, email), 
                data_nascimento = COALESCE(?, data_nascimento), 
                telefone = COALESCE(?, telefone), 
                localizacao = COALESCE(?, localizacao)
            WHERE id = ?`;

        const [result] = await connection.execute(query, [nome, email, data_nascimento, telefone, localizacao, userId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        res.status(200).json({ message: 'Perfil atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar o perfil:', error);
        res.status(500).json({ error: 'Erro ao atualizar o perfil.' });
    }
};