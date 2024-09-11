import express from 'express';
import { createUser, verifyToken, logInUser, getResetPassword, setNewPassword, forgotPassword, updatePassword, resetPasswordHandler } from '../controllers/authController.js';
import { check } from 'express-validator';
import User from '../models/UsuarioModel.js'; // Asegúrate de que esta importación sea correcta

const routerAuth = express.Router();

routerAuth.post('/forgot-password', forgotPassword);

routerAuth.post('/register', 
    [
        check('email', 'por favor digite un email valido').isEmail(),
        check('contraseña', 'por favor ingrese una contraseña con mas de 8 caracteres').isLength({ min: 8 }),
        check('Nom_Usuario', 'El nombre es obligatorio y solo puede contener letras y espacios').matches(/^[a-zA-Z\s]+$/),
        check('Ape_Usuario', 'El apellido es obligatorio y solo puede contener letras y espacios').matches(/^[a-zA-Z\s]+$/),
        check('Cor_Usuario', 'Por favor ingrese un correo válido').isEmail(),
        check('Con_Usuario', 'La contraseña es obligatoria').exists()
    ], 
    createUser
);

routerAuth.get('/verify', (req, res) => {
    res.status(200).send('Token Verified');
});

routerAuth.post('/login', logInUser);
routerAuth.post('/reset-password', getResetPassword);
routerAuth.post('/set-new-password', setNewPassword);

routerAuth.post('/resetPassword', resetPasswordHandler);

routerAuth.post('/update-password', updatePassword);

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
