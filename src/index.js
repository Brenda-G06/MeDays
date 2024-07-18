const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rotasUsuarios = require('./routes/rotasUsuarios'); // importa as rotas de usuários

app.use(bodyParser.json());

// define as rotas para usuários
app.use('/api/usuarios', rotasUsuarios);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
