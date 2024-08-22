import express from 'express';
import { createUser, verifyToken, logInUser, getResetPassword, setNewPassword } from '../controllers/authController.js';
import { check } from 'express-validator';
import winston from 'winston';

const routerAuth = express.Router();

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log' })
  ],
});

routerAuth.post('/', 
    [
        check('email', 'por favor digite un email válido').isEmail(),
        check('contraseña', 'por favor ingrese una contraseña con más de 8 caracteres').isLength({ min: 8})
    ], 
    createUser
);

routerAuth.get('/verify', verifyToken);
routerAuth.post('/login', logInUser);
routerAuth.post('/request-password-reset', getResetPassword);
routerAuth.post('/reset-password', setNewPassword);

// Middleware para manejo de errores
routerAuth.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`);
  res.status(500).json({ error: 'An error occurred' });
});

export default routerAuth;
