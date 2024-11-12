
const express = require('express');
const router = express.Router();
const { listarProfissionais } = require('../controllers/controllerProfissional');


router.get('/profissionais', listarProfissionais);

module.exports = router;
