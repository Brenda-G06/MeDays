const express = require('express');

const router = express.Router();

const usurarioController = require('../controllers/controllersUsuarios');


router.post('/user', controllersUsuarios.createUser);
router.get('/user/:id/schedule', controllerUsuarios.getAgendaUsuario);

module.exports = router;