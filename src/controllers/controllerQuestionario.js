const connectToDatabase = require('../config/db'); 
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


exports.salvarResposta = async (req, res) => {
    const { id_usuario, id_pergunta, resposta } = req.body; 
    const data_resposta = new Date();

    if (!id_usuario || !id_pergunta || !resposta) {
        return res.status(400).json({ error: 'id_usuario, id_pergunta e resposta são obrigatórios.' });
    }

    try {
        const connection = await connectToDatabase();

        const query = 'INSERT INTO resposta (id_usuario, id_pergunta, resposta, data_resposta) VALUES (?, ?, ?, ?)';
        await connection.query(query, [id_usuario, id_pergunta, resposta, data_resposta]);

        const condicionalQuery = 'SELECT condicional FROM pergunta WHERE id = ?';
        const [question] = await connection.query(condicionalQuery, [id_pergunta]);

        let proximaPerguntaId = null;

        if (question[0]?.condicional) {
            const condicional = JSON.parse(question[0].condicional);
            proximaPerguntaId = condicional[resposta] || null;
        }

        if (!proximaPerguntaId) {
            const proximaPerguntaQuery = 'SELECT id FROM pergunta WHERE id > ? ORDER BY id ASC LIMIT 1';
            const [nextQuestion] = await connection.query(proximaPerguntaQuery, [id_pergunta]);
            proximaPerguntaId = nextQuestion[0]?.id || null;
        }

        connection.end();

        if (!proximaPerguntaId) {
            return res.status(200).json({
                message: 'Resposta salva com sucesso!',
                proximaPerguntaId: null,
                info: 'Fim do questionário.'
            });
        }

        res.status(201).json({
            message: 'Resposta salva com sucesso!',
            proximaPerguntaId,
        });
    } catch (error) {
        console.error('Erro ao salvar resposta:', error);
        res.status(500).json({ error: 'Erro ao salvar resposta' });
    }
};
exports.listarPerguntas = async (req, res) => {
    const userId = req.userId; 
    const respostaAnterior = req.query.respostaAnterior;
    try {
        const db = await connectToDatabase();

     
        const query = `
            SELECT id, pergunta, tipo_pergunta, condicional, id_profissional, opcoes
            FROM pergunta
        `;
        const [rows] = await db.query(query);

       
        const perguntasFormatadas = rows.map(pergunta => ({
            ...pergunta,
            opcoes: JSON.parse(pergunta.opcoes || '[]'), 
        }));

        
        if (respostaAnterior === 'Sim, pratico') {
            console.log('Filtrando perguntas para resposta "Sim, pratico".');
            return res.status(200).json(perguntasFormatadas.filter(pergunta => pergunta.id !== 3));
        }


        console.log('Enviando todas as perguntas para outras respostas.');
        res.status(200).json(perguntasFormatadas);
    } catch (error) {
        console.error('Erro ao listar perguntas:', error);
        res.status(500).json({ error: 'Erro ao buscar perguntas no banco de dados.' });
    }
};exports.Consultas = async (req, res) => {
    const { id_usuario } = req.body; 
    if (!id_usuario) {
        return res.status(400).json({ error: 'id_usuario é obrigatório.' });
    }

    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.query(
            'SELECT id_pergunta, resposta FROM resposta WHERE id_usuario = ?',
            [id_usuario]
        );

        if (rows.length === 0) {
            connection.end();
            return res.status(404).json({ error: 'Nenhuma resposta encontrada para o usuário.' });
        }

       
        const recomendacoes = {
            fisioterapeuta: 6,
            nutricionista: 3,
            psicologo: 6,
            endocrinologista: 12,
            educador_fisico: 4,
        };

 
        console.log('Respostas do usuário:', rows);

       
        rows.forEach(row => {
            console.log(`Analisando resposta da pergunta ${row.id_pergunta}: ${row.resposta}`);
            switch (row.id_pergunta) {
                case 3:
                    if (row.resposta === "Raramente") recomendacoes.educador_fisico -= 1;
                    break;
                case 4:
                    if (row.resposta === "Não, não sigo") recomendacoes.nutricionista -= 1;
                    break;
                case 6:
                    if (row.resposta === "Sim") recomendacoes.fisioterapeuta -= 2;
                    break;
                case 8:
                    if (row.resposta === "Sim") recomendacoes.nutricionista -= 1;
                    break;
                case 9:
                    if (row.resposta === "Sim") recomendacoes.fisioterapeuta -= 1;
                    break;
                case 11:
                    if (row.resposta === "Frequentemente") recomendacoes.psicologo -= 2;
                    else if (row.resposta === "Ocasionalmente") recomendacoes.psicologo -= 1;
                    break;
                case 13:
                    if (row.resposta === "Sim") recomendacoes.endocrinologista -= 2;
                    break;
                case 20:
                    if (row.resposta === "Moderada") recomendacoes.fisioterapeuta -= 1;
                    else if (row.resposta === "Intensa") recomendacoes.fisioterapeuta -= 2;
                    break;
            }
        });

       
        console.log('Recomendações após cálculo:', recomendacoes);

        
        const frequencias = Object.keys(recomendacoes).map(profissional => ({
            profissional,
            frequencia: recomendacoes[profissional] <= 1 ? "Mensal" :
                        recomendacoes[profissional] <= 2 ? "Bimestral" :
                        recomendacoes[profissional] <= 4 ? "Trimestral" :
                        recomendacoes[profissional] <= 6 ? "Semestral" : "Anual",
        }));


        console.log('Frequências calculadas:', frequencias);

        await connection.query(
            'UPDATE usuario SET cronograma = ? WHERE id = ?',
            [JSON.stringify(frequencias), id_usuario]
        );

        connection.end();
        res.status(200).json({ frequencias });
    } catch (error) {
        console.error('Erro ao calcular frequências de consultas:', error);
        res.status(500).json({ error: 'Erro ao calcular frequências de consultas' });
    }
};

exports.recalcularFrequencias = async (req, res) => {
    const { id_usuario } = req.body; 
    if (!id_usuario) {
        return res.status(400).json({ error: 'id_usuario é obrigatório.' });
    }

    try {
       
        const connection = await connectToDatabase();
        
        
        const [rows] = await connection.query(
            'SELECT id_pergunta, resposta FROM resposta WHERE id_usuario = ?',
            [id_usuario]
        );

        if (rows.length === 0) {
            connection.end();
            return res.status(404).json({ error: 'Nenhuma resposta encontrada para o usuário.' });
        }

    
        const recomendacoes = {
            fisioterapeuta: 6,
            nutricionista: 3,
            psicologo: 6,
            endocrinologista: 12,
            educador_fisico: 4,
        };

       
        rows.forEach(row => {
            switch (row.id_pergunta) {
                case 3:
                    if (row.resposta === "Raramente") recomendacoes.educador_fisico -= 1;
                    break;
                case 4:
                    if (row.resposta === "Não, não sigo") recomendacoes.nutricionista -= 1;
                    break;
                case 6:
                    if (row.resposta === "Sim") recomendacoes.fisioterapeuta -= 2;
                    break;
                case 8:
                    if (row.resposta === "Sim") recomendacoes.nutricionista -= 1;
                    break;
                case 9:
                    if (row.resposta === "Sim") recomendacoes.fisioterapeuta -= 1;
                    break;
                case 11:
                    if (row.resposta === "Frequentemente") recomendacoes.psicologo -= 2;
                    else if (row.resposta === "Ocasionalmente") recomendacoes.psicologo -= 1;
                    break;
                case 13:
                    if (row.resposta === "Sim") recomendacoes.endocrinologista -= 2;
                    break;
                case 20:
                    if (row.resposta === "Moderada") recomendacoes.fisioterapeuta -= 1;
                    else if (row.resposta === "Intensa") recomendacoes.fisioterapeuta -= 2;
                    break;
            }
        });

        
        const frequencias = Object.keys(recomendacoes).map(profissional => ({
            profissional,
            frequencia: recomendacoes[profissional] <= 1 ? "Mensal" :
                        recomendacoes[profissional] <= 2 ? "Bimestral" :
                        recomendacoes[profissional] <= 4 ? "Trimestral" :
                        recomendacoes[profissional] <= 6 ? "Semestral" : "Anual",
        }));

      
        await connection.query(
            'UPDATE usuario SET cronograma = ? WHERE id = ?',
            [JSON.stringify(frequencias), id_usuario]
        );

        connection.end(); 
        res.status(200).json({ frequencias });
    } catch (error) {
        console.error('Erro ao calcular frequências de consultas:', error);
        res.status(500).json({ error: 'Erro ao calcular frequências de consultas' });
    }
};