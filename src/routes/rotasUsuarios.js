const express = require('express');
const router = express.Router();
const { createUser, getUserByUserName } = require('../controllers/controllersUsuarios');


router.post('/user', createUser);

router.get('/usuarios/:userName', getUserByUserName);

module.exports = router;
