import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transportador = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendPassworResetEmail  = async (email, resetPasswordUrl) => {
    // Configuración del transporte de correo
    const transporter = nodeMailer.createTransport({
        service: 'Gmail', // O el servicio de correo que uses
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Restablecimiento de Contraseña',
        html: `
            <p>Hola,</p>
            <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:</p>
            <a href="${resetPasswordUrl}">Restablecer contraseña</a>
            <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
        `,
    };

    await transporter.sendMail(mailOptions);
};