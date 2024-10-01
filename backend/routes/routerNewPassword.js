// routes/resetPassword.js
import express from 'express';
import resetPasswordController from '../controllers/resetPasswordController.js';

const routerResetPassword = express.Router();

// Ruta para manejar el restablecimiento de contraseña
routerResetPassword.post('/resetPassword', resetPasswordController.resetPassword);

export default routerResetPassword;