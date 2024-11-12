const express = require('express');
const cors = require('cors');
const consultaRoutes = require('./routes/consultaRoutes');
const rotasUsuarios = require('./routes/rotasUsuarios');
const questionarioRoutes = require('./routes/questionarioRoutes');
const connectToDatabase = require('./config/db');
const profissionalRouter = require('./routes/profissionalRoutes');

const app = express();


app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));


app.use('/api', consultaRoutes);
app.use('/usuarios', rotasUsuarios);
app.use('/questionario', questionarioRoutes);
app.use('/profissionais', profissionalRouter);



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
