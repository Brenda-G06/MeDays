const express = require('express');
const cors = require('cors');
const consultaRoutes = require('./routes/consultaRoutes');
const rotasUsuarios = require('./routes/rotasUsuarios');
const questionarioRoutes = require('./routes/questionarioRoutes');
const connectToDatabase = require('./config/db');
const profissionalRouter = require('./routes/profissionalRoutes');

const sendConsultationAlerts = require('./routes/alertRoute')
const app = express();


app.use(express.json());
app.use(cors({ origin: 'https://front-66iubc0aw-brenda-g06s-projects.vercel.app/' }));


app.use('/api', consultaRoutes);
app.use('/usuarios', rotasUsuarios);
app.use('/questionario', questionarioRoutes);
app.use('/profissionais', profissionalRouter);
app.use('/alerta', sendConsultationAlerts);

setInterval(async () => {
    try {
        const [consultas] = await connection.execute(`
            SELECT c.data_consulta, u.id AS userId, u.email, u.nome
            FROM consultas c
            INNER JOIN usuario u ON c.userId = u.id
            WHERE c.data_consulta >= NOW() AND c.data_consulta <= DATE_ADD(NOW(), INTERVAL 3 DAY)
        `);

        for (const consulta of consultas) {
            await sendConsultationAlerts(consulta.userId, consulta.data_consulta, 3);
        }
    } catch (error) {
        console.error('Erro ao enviar alertas:', error);
    }
}, 60 * 60 * 1000);
connectToDatabase()
    .then(() => {
        console.log('Banco de dados conectado com sucesso.');

        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Erro ao conectar ao banco de dados:', error);
    });

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});
