import express from 'express';
import { createUser, verifyToken, logInUser, getResetPassword, setNewPassword } from '../controllers/authController.js';
import { check } from 'express-validator';

const routerAuth = express.Router();

routerAuth.post('/', 
    [
        check('email', 'por favor digite un email valido').isEmail(),
        check('contraseña', 'por favor ingrese una contraseña con mas de 8 caracteres').isLength({ min: 8 })
    ], 
    createUser
);
//saca canas jajaja
routerAuth.get('/verify', (req, res) => {
    // Aquí debería ir la lógica para verificar el token
    res.status(200).send('Token Verified');
  });
  routerAuth.post('/login', [
    check('Cor_Usuario', 'Por favor ingrese un email válido').isEmail(),
    check('Con_Usuario', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 })
], logInUser);

routerAuth.post('/request-password-reset', getResetPassword);
routerAuth.post('/reset-password', setNewPassword);
routerAuth.get('/protected-route', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Ruta protegida accesible' });
});


// Rutas protegidas
routerAuth.get('/alimentacion', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Datos de alimentación' });
});

routerAuth.get('/responsable', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Datos de responsable' });
});

routerAuth.get('/estanque', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Datos de estanque' });
});

routerAuth.get('/especie', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Datos de especie' });
});

routerAuth.get('/traslado', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Datos de traslado' });
});

routerAuth.get('/actividad', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Datos de actividad' });
});

routerAuth.get('/siembra', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Datos de siembra' });
});

routerAuth.get('/mortalidad', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Datos de mortalidad' });
});

routerAuth.get('/muestreo', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Datos de muestreo' });
});

routerAuth.get('/cosecha', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Datos de cosecha' });
});


export default routerAuth;