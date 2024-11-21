const express = require('express');
const router = express.Router();
const questionarioController = require('../controllers/controllerQuestionario');


router.post('/respostas', questionarioController.salvarResposta);

router.get('/perguntas', questionarioController.listarPerguntas);

router.get('/consultas', questionarioController.Consultas);

router.post('/recalcular-frequencias', questionarioController.recalcularFrequencias);
module.exports = router;
