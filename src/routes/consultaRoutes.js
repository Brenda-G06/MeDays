
const express = require('express');
const { adicionarConsulta } = require('../controllers/controllerConsulta');

const router = express.Router();

router.post('/consultas', adicionarConsulta)

module.exports = router;
