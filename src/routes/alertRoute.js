const express = require('express');
const router = express.Router();
const { sendConsultationAlerts } = require('../controllers/alertController');
const connectToDatabase = require('../config/db'); 

router.post('/send-alerts', async (req, res) => {
    try {
        const connection = await connectToDatabase(); 
        
 
        const [consultas] = await connection.execute(`
            SELECT c.data, u.id AS userId, u.email, u.nome
            FROM consultas c
            INNER JOIN usuario u ON c.usuario_id = u.id
            WHERE c.data >= NOW() AND c.data <= DATE_ADD(NOW(), INTERVAL 3 DAY)
        `);


        for (const consulta of consultas) {
            await sendConsultationAlerts(consulta.userId, consulta.data_consulta, 3);
        }

        res.status(200).json({ message: 'Alertas de consultas enviados com sucesso!' });
    } catch (error) {
        console.error('Erro ao enviar alertas:', error);
        res.status(500).json({ error: 'Erro ao enviar alertas de consulta.' });
    }
});

module.exports = router;
