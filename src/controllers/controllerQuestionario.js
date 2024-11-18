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
        
        // Obter perguntas e respostas anteriores do usuário
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

        const [perguntas] = await connection.query('SELECT id, pergunta, opcoes, condicional FROM pergunta');
        const [respostasUsuario] = await connection.query('SELECT id_pergunta, resposta FROM resposta WHERE id_usuario = ?', [id_usuario]);
        connection.end();

        // Mapear respostas anteriores para fácil acesso
        const respostasMap = respostasUsuario.reduce((map, resposta) => {
            map[resposta.id_pergunta] = resposta.resposta;
            return map;
        }, {});

        // Filtrar perguntas baseando-se na condicionalidade
        const perguntasFiltradas = perguntas.filter(pergunta => {
            if (pergunta.condicional === 0) {
                return true; // Perguntas não condicionais sempre aparecem
            }

            // Verificar se a pergunta condicional foi respondida e a resposta é válida
            const respostaCondicional = respostasMap[pergunta.condicional];
            if (!respostaCondicional) {
                return false; // A condicional não foi respondida
            }

            // Ajuste a lógica de validação da condicional conforme necessário
            if (pergunta.id === 3 && respostaCondicional === 'Sim, pratico') {
                return true; // Exemplo: Apenas mostrar frequência se prática foi afirmativa
            }

            return false; // Caso não atenda a condição, não mostrar
        });

        // Formatar perguntas com opções como JSON
        const formattedPerguntas = perguntasFiltradas.map(pergunta => ({
            ...pergunta,
            opcoes: JSON.parse(pergunta.opcoes),
        }));

        res.json(formattedPerguntas);
    } catch (error) {
        console.error('Erro ao listar perguntas condicionais:', error);
        res.status(500).json({ error: 'Erro ao listar perguntas condicionais' });
    }
};



exports.Consultas = async (req, res) => {
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

    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.query(
            'SELECT id_pergunta, resposta FROM resposta WHERE id_usuario = ?',
            [id_usuario]
        );
        connection.end();

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Nenhuma resposta encontrada para o usuário.' });
        }

        let totalPontuacao = 0;
        let perguntasComPeso = 0;

        rows.forEach(row => {
            let pesoResposta = 0;

            switch (row.id_pergunta) {
                case 3:
                    if (row.resposta === "Diariamente") pesoResposta = 5;
                    else if (row.resposta === "3-4 vezes por semana") pesoResposta = 4;
                    else if (row.resposta === "1-2 vezes por semana") pesoResposta = 3;
                    else if (row.resposta === "Raramente") pesoResposta = 2;
                    break;

                case 9:
                    pesoResposta = row.resposta === "Sim" ? 5 : 1;
                    break;

                case 11:
                    if (row.resposta === "Frequentemente") pesoResposta = 5;
                    else if (row.resposta === "Ocasionalmente") pesoResposta = 3;
                    else pesoResposta = 1;
                    break;

                case 20:
                    if (row.resposta === "Intensa") pesoResposta = 5;
                    else if (row.resposta === "Moderada") pesoResposta = 3;
                    else pesoResposta = 1;
                    break;

                default:
                    pesoResposta = 1;
            }

            totalPontuacao += pesoResposta;
            perguntasComPeso++;
        });

        const mediaConsultas = perguntasComPeso ? totalPontuacao / perguntasComPeso : 0;

        const recomendacoes = [];

        if (mediaConsultas >= 4) {
            recomendacoes.push({ tipo: "Consulta com Cardiologista", frequencia: "Mensal" });
            recomendacoes.push({ tipo: "Consulta com Nutricionista", frequencia: "Bimestral" });
            recomendacoes.push({ tipo: "Consulta com Psicólogo", frequencia: "Trimestral" });
        } else if (mediaConsultas >= 3) {
            recomendacoes.push({ tipo: "Consulta com Nutricionista", frequencia: "Trimestral" });
            recomendacoes.push({ tipo: "Consulta com Educador Físico", frequencia: "Trimestral" });
        } else if (mediaConsultas >= 2) {
            recomendacoes.push({ tipo: "Consulta com Fisioterapeuta", frequencia: "Semestral" });
            recomendacoes.push({ tipo: "Consulta com Psicólogo", frequencia: "Anual" });
        } else {
            recomendacoes.push({ tipo: "Consulta com Clínico Geral", frequencia: "Anual" });
        }

        res.json({ recomendacoes });
    } catch (error) {
        console.error('Erro ao calcular média de consultas:', error);
        res.status(500).json({ error: 'Erro ao calcular média de consultas' });
    }
};