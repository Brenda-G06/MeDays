const nodemailer = require('nodemailer');
const moment = require('moment');  
const connectToDatabase = require('../config/db');

const transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
        user: 'projetomedays@gmail.com',  
        pass: 'atam defz ebrg cojq', 
    },
});


function sendConfirmationEmail(userEmail, token) {
    const confirmationLink = `http://localhost:3000/confirm-email?token=${token}`; 

    const mailOptions = {
        from: 'seuemail@gmail.com',  
        to: userEmail,  
        subject: 'Confirmação de Cadastro',  
        text: `Olá, para confirmar seu cadastro, clique no link abaixo:\n${confirmationLink}`,  
    };

    return transporter.sendMail(mailOptions)
        .then(info => {
            console.log('E-mail de confirmação enviado:', info.response);
        })
        .catch(error => {
            console.log('Erro ao enviar e-mail:', error);
            throw error;  
        });
}


async function sendConsultationAlerts(userId, consultaData, alertDays) {
    const connection = await connectToDatabase();
    

    const alertaData = moment(consultaData).subtract(alertDays, 'days');  

   
    if (alertaData.isSameOrBefore(moment(), 'day')) {

        const [user] = await connection.execute('SELECT nome, email FROM usuario WHERE id = ?', [userId]);

        if (user && user[0]) {
            const userEmail = user[0].email;
            const userName = user[0].nome;

            const mailOptions = {
                from: 'projetomedays@gmail.com',  
                to: userEmail,  
                subject: `Alerta: Sua consulta está próxima`,  
                text: `Olá ${userName},\n\nLembrete: Sua consulta está agendada para ${moment(consultaData).format('DD/MM/YYYY')}. Não se esqueça!\n\nEste é um lembrete automático.\n\nAtenciosamente,\nEquipe.`,
            };

            try {
                
                await transporter.sendMail(mailOptions);
                console.log(`Alerta de consulta enviado para ${userEmail}`);
            } catch (error) {
                console.error('Erro ao enviar alerta de consulta:', error);
            }
        } else {
            console.log('Usuário não encontrado para o alerta de consulta.');
        }
    } else {
        console.log('Nenhuma consulta para enviar alerta.');
    }
}

module.exports = { sendConfirmationEmail, sendConsultationAlerts };
