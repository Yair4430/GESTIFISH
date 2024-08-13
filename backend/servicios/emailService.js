import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transportador = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: process.env.EMAIL_PORT,
    secure: false, // true para 465, false para otros puertos
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendPassworResetEmail = async (Cor_Usuario, tokenForPassword) => {
    const RESET_URL = `${process.env.BASE_URL}/reset-password?llaves=${tokenForPassword}`;
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: Cor_Usuario,
        subject: 'Restablecer contraseña',
        text: `Por favor use el siguiente enlace para restablecer su contraseña: ${RESET_URL}`
    };

    try {
        const info = await transportador.sendMail(mailOptions);
        console.log('Correo enviado correctamente:', info);
    } catch (error) {
        console.error('Error al enviar el correo:', error);
    }
}