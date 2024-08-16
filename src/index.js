const express = require('express');
const app = express();
const consultaRoutes = require('./routes/consultaRoutes');
const rotasUsuarios = require('./routes/rotasUsuarios'); 
const connectToDatabase = require('./config/db'); 
const cors = require('cors')

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000' // Permitir requisições do frontend
}));
app.use('/api', consultaRoutes);
app.use('/api/usuarios', rotasUsuarios);
connectToDatabase().then(() => {
    console.log('Banco de dados conectado com sucesso.');

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
});
