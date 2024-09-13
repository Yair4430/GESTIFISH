
import bcryptjs from 'bcryptjs';
import UsuarioModel from '../models/usuarioModel.js';
import jwt from 'jsonwebtoken';
import { sendPassworResetEmail } from '../servicios/emailService.js';

// Crear nuevo usuario
export const createUser = async (req, res) => {
    try {
        const { Nom_Usuario, Ape_Usuario, Cor_Usuario, Con_Usuario } = req.body;

        // Validar nombres y apellidos
        const nameRegex = /^[a-zA-Z\s]+$/;

        if (!nameRegex.test(Nom_Usuario)) {
            return res.status(400).json({ message: 'El nombre solo puede contener letras y espacios' });
        }

        if (!nameRegex.test(Ape_Usuario)) {
            return res.status(400).json({ message: 'El apellido solo puede contener letras y espacios' });
        }

        // Verificar si el usuario ya existe
        let user = await UsuarioModel.findOne({ where: { Cor_Usuario } });

        if (user) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        // Crear nuevo usuario
        let passHash = await bcryptjs.hash(Con_Usuario, 12);
        const newUser = await UsuarioModel.create({
            Nom_Usuario,
            Ape_Usuario,
            Cor_Usuario,
            Con_Usuario: passHash,
        });

        // Encriptar el Cor_Usuario y Id_Usuario para el token
        const encryptedEmail = await bcryptjs.hash(newUser.Cor_Usuario, 8);
        const encryptedId = await bcryptjs.hash(newUser.Id_Usuario.toString(), 8);

        console.log('Encrypted Email:', encryptedEmail);
        console.log('Encrypted ID:', encryptedId);

        const tokenUser = jwt.sign(
            { user: { Cor_Usuario: encryptedEmail, Id_Usuario: encryptedId } },
            process.env.JWT_LLAVE,
            { expiresIn: '1h' }
        );

        res.json({ tokenUser });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Iniciar sesión
export const logInUser = async (req, res) => {
    try {
        const { Cor_Usuario, Con_Usuario } = req.body;

        const usuario = await UsuarioModel.findOne({ where: { Cor_Usuario } });

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const usuarioValido = await bcryptjs.compare(Con_Usuario, usuario.Con_Usuario);

        if (usuarioValido) {
            // Encriptar el Cor_Usuario y Id_Usuario para el token
            const encryptedEmail = await bcryptjs.hash(usuario.Cor_Usuario, 8);
            const encryptedId = await bcryptjs.hash(usuario.Id_Usuario.toString(), 8);

            console.log('Encrypted Email:', encryptedEmail);
            console.log('Encrypted ID:', encryptedId);

            const token = jwt.sign(
                { user: { Cor_Usuario: encryptedEmail, Id_Usuario: encryptedId } },
                process.env.JWT_LLAVE,
                { expiresIn: '1h' } // El token expira en 1 hora
            );

            res.json({ tokenUser: token });
        } else {
            res.status(401).json({ error: "Contraseña incorrecta" });
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: "Error del servidor" });
    }
};


// Verificar token
export const verifyToken = async (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    
    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1];
        console.log('Token recibido:', token);

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_LLAVE);
            console.log('Token decodificado:', decoded);
            req.user = decoded; // Almacena los datos del usuario decodificado en `req.user`
            next(); // Continúa con la ruta protegida
        } catch (error) {
            console.error('Error de verificación de token:', error);
            res.status(403).json({ message: 'Token inválido o expirado' });
        }
    } else {
        res.status(401).json({ message: 'No se encontró el token' });
    }
};

// Restablecer contraseña
export const getResetPassword = async (req, res) => {
    const { Cor_Usuario } = req.body;
    try {
        const user = await UsuarioModel.findOne({ where: { Cor_Usuario } });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const tokenForPassword = jwt.sign(
            { user: { Id_Usuario: user.Id_Usuario, Nom_Usuario: user.Nom_Usuario, Ape_Usuario: user.Ape_Usuario, Cor_Usuario: user.Cor_Usuario } },
            process.env.JWT_LLAVE,
            { expiresIn: '1d' }
        );

        await sendPassworResetEmail(Cor_Usuario, tokenForPassword);
        res.status(200).json({ message: 'El mensaje para restablecer contraseña fue enviado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Establecer nueva contraseña
export const setNewPassword = async (req, res) => {
    const { tokenForPassword, newPassword } = req.body;
    try {
        const decodificado = jwt.verify(tokenForPassword, process.env.JWT_LLAVE);

        const user = await UsuarioModel.findByPk(decodificado.user.Id_Usuario);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            const passHash = await bcryptjs.hash(newPassword, 8);

            await UsuarioModel.update(
                { Con_Usuario: passHash },
                { where: { Id_Usuario: decodificado.user.Id_Usuario } }
            );

            res.status(200).json({ message: 'Contraseña actualizada correctamente' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Información inválida o el tiempo ha expirado' });
    }
};
