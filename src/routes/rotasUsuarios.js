const express = require('express');
const router = express.Router();
const controllersUsuarios = require('../controllers/controllersUsuarios');

router.post('/user', controllersUsuarios.createUser);
router.get('/users', controllersUsuarios.listUsers);

module.exports = router;
