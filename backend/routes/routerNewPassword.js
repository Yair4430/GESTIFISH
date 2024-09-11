// routes/resetPassword.js
import express from 'express';
import resetPasswordController from '../controllers/resetPasswordController.js';

const router = express.Router();

// Ruta para manejar el restablecimiento de contraseña
router.post('/resetPassword', resetPasswordController.resetPassword);

export default router;
