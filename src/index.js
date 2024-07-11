// src/index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require('./routes/rotasUsuarios');

app.use(express.json());
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});