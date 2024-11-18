
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',  
    auth: {
        user: 'seuemail@gmail.com',  
        pass: 'suasenha', 
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

module.exports = { sendConfirmationEmail };
