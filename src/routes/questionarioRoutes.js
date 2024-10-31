const express = require('express');
const router = express.Router();
const questionarioController = require('../controllers/controllerQuestionario');


router.post('/respostas', questionarioController.salvarRespostas);


router.get('/perguntas', questionarioController.listarPerguntas);


router.post('/perguntas', questionarioController.criarPergunta);


router.put('/perguntas/:id', questionarioController.editarPergunta);

module.exports = router;
