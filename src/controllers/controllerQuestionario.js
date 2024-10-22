const connectToDatabase = require('../config/db'); 


exports.salvarRespostas = async (req, res) => {
    const { usuarioId, respostas } = req.body;

    if (!usuarioId || !respostas || respostas.length === 0) {
        return res.status(400).json({ error: 'Dados incompletos.' });
    }

    try {

        const queries = respostas.map((resposta) => {
            return `INSERT INTO respostas (usuario_id, pergunta_id, resposta) VALUES (${usuarioId}, ${resposta.questionId}, '${resposta.answer}')`;
        });

        for (const query of queries) {
            await connectToDatabase.query(query);
        }

        res.status(200).json({ message: 'Respostas salvas com sucesso' });
    } catch (error) {
        console.error('Erro ao salvar respostas:', error);
        res.status(500).json({ error: 'Erro interno ao salvar respostas' });
    }
};


exports.listarPerguntas = async (req, res) => {
    try {
        const perguntas = await connectToDatabase.query('SELECT * FROM perguntas');
        res.status(200).json(perguntas);
    } catch (error) {
        console.error('Erro ao listar perguntas:', error);
        res.status(500).json({ error: 'Erro ao listar perguntas' });
    }
};


exports.criarPergunta = async (req, res) => {
    const { pergunta, tipo_pergunta, condicional_para, autor_id } = req.body;

    if (!pergunta || !tipo_pergunta || !autor_id) {
        return res.status(400).json({ error: 'Dados incompletos.' });
    }

    try {
        await connectToDatabase.query(
            'INSERT INTO perguntas (pergunta, tipo_pergunta, condicional_para, autor_id) VALUES (?, ?, ?, ?)',
            [pergunta, tipo_pergunta, condicional_para || null, autor_id]
        );
        res.status(201).json({ message: 'Pergunta criada com sucesso!' });
    } catch (error) {
        console.error('Erro ao criar pergunta:', error);
        res.status(500).json({ error: 'Erro interno ao criar pergunta.' });
    }
};


exports.editarPergunta = async (req, res) => {
    const { id } = req.params;
    const { pergunta, tipo_pergunta, condicional_para } = req.body;

    if (!pergunta || !tipo_pergunta) {
        return res.status(400).json({ error: 'Dados incompletos.' });
    }

    try {
        await connectToDatabase.query(
            'UPDATE perguntas SET pergunta = ?, tipo_pergunta = ?, condicional_para = ? WHERE id = ?',
            [pergunta, tipo_pergunta, condicional_para || null, id]
        );
        res.status(200).json({ message: 'Pergunta editada com sucesso!' });
    } catch (error) {
        console.error('Erro ao editar pergunta:', error);
        res.status(500).json({ error: 'Erro interno ao editar pergunta.' });
    }
};
