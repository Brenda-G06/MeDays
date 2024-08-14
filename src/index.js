const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rotasUsuarios = require('./routes/rotasUsuarios'); // importa as rotas de usuários
const connectToDatabase = require('./config/db'); // importa a função de conexão com o banco de dados

app.use(bodyParser.json());

// Chama a função de conexão com o banco de dados
connectToDatabase().then(() => {
    console.log('Banco de dados conectado com sucesso.');
}).catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
});

// define as rotas para usuários
app.use('/api/usuarios', rotasUsuarios);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


module.exports = connectToDatabase;

