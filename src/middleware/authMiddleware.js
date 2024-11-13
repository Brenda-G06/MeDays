const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token de autenticação necessário.' });
    }
 
    try {
        const decoded = jwt.verify(token, 'Brenda-Gomes_Projeto_Me_Days0605119');
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(403).json({ error: 'Token inválido ou expirado.' });
    }
};
