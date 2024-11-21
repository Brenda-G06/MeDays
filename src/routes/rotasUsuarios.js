const express = require('express');
const router = express.Router();
const { createUser, getUserByUserName, getUserProfile, obterCronograma, loginUser, confirmEmail, updateUserProfile } = require('../controllers/controllersUsuarios');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/user', createUser);
router.get('/usuarios/:userName', getUserByUserName);
router.get('/profile', authMiddleware, getUserProfile); 
router.get('/cronograma', authMiddleware, obterCronograma);
router.post('/login',authMiddleware, loginUser );
router.put('/profile', authenticate, updateUserProfile);
module.exports = router;
