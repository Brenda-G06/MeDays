import { verify } from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido.' });
    }

    verify(token, 'Brenda-Gomes_Projeto_Me_Days0605119', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido.' });
        }

        req.userId = decoded.id;
        next();
    });
};
