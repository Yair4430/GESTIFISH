import express from 'express';
import { createUser, verifyToken, logInUser, getResetPassword, setNewPassword } from '../controllers/authController.js';
import { check } from 'express-validator';

const routerAuth = express.Router();

// Ruta para registro de usuario
routerAuth.post('/', 
    [
        check('email', 'Por favor, ingrese un email válido').isEmail(),
        check('contraseña', 'Por favor, ingrese una contraseña con más de 8 caracteres').isLength({ min: 8 })
    ],
    createUser
);

// Ruta para iniciar sesión
routerAuth.post('/login', logInUser);

// Ruta para verificar el token
routerAuth.get('/verify', verifyToken);

// Ruta para solicitar restablecimiento de contraseña
routerAuth.post('/request-password-reset', getResetPassword);

// Ruta para establecer una nueva contraseña
routerAuth.post('/reset-password', setNewPassword);

export default routerAuth;
