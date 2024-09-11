import bcryptjs from 'bcryptjs';
import UsuarioModel from '../models/UsuarioModel.js';
import jwt from 'jsonwebtoken';
import { sendPassworResetEmail } from '../servicios/emailService.js';

export const forgotPassword = async (req, res) => {
    const { Cor_Usuario } = req.body;

    try {
        // Generar token de restablecimiento
        const tokenForPassword = jwt.sign(
            { Cor_Usuario },
            process.env.JWT_LLAVE,
            { expiresIn: '1h' }
        );

        // URL del frontend
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        const resetPasswordUrl = `${frontendUrl}/reset-password?token=${tokenForPassword}`;

        // Enviar el correo
        await sendPassworResetEmail(Cor_Usuario, resetPasswordUrl);

        res.status(200).json({ message: 'Correo enviado para restablecer la contraseña si el correo está registrado.' });
    } catch (error) {
        console.error('Error al enviar el correo de restablecimiento:', error.message);
        res.status(500).json({ message: 'Hubo un error al intentar enviar el correo de restablecimiento.' });
    }
};

export const updatePassword = async (req, res) => {
    const { tokenForPassword, newPassword } = req.body;

    try {
        // Verifica el token (este es un ejemplo; ajusta según tu implementación)
        const decoded = jwt.verify(tokenForPassword, process.env.JWT_SECRET);

        // Encuentra al usuario
        const user = await User.findOne({ where: { id: decoded.userId } });

        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Encripta la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualiza la contraseña en la base de datos
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        res.status(400).json({ message: 'Token inválido o error en la actualización' });
    }
};

export const createUser = async (req, res) => {
    try {
        const { Nom_Usuario, Ape_Usuario, Cor_Usuario, Con_Usuario } = req.body;

        const nameRegex = /^[a-zA-Z\s]+$/;

        if (!nameRegex.test(Nom_Usuario)) {
            return res.status(400).json({ message: 'El nombre solo puede contener letras y espacios' });
        }

        if (!nameRegex.test(Ape_Usuario)) {
            return res.status(400).json({ message: 'El apellido solo puede contener letras y espacios' });
        }

        let user = await UsuarioModel.findOne({ where: { Cor_Usuario } });

        if (user) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        let passHash = await bcryptjs.hash(Con_Usuario, 8);
        const newUser = await UsuarioModel.create({
            Nom_Usuario,
            Ape_Usuario,
            Cor_Usuario,
            Con_Usuario: passHash,
        });

        const tokenUser = jwt.sign(
            { user: { Cor_Usuario: newUser.Cor_Usuario, Id_Usuario: newUser.Id_Usuario } },
            process.env.JWT_LLAVE,
            { expiresIn: '1h' }
        );

        res.json({ tokenUser });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const logInUser = async (req, res) => {
    try {
        const { Cor_Usuario, Con_Usuario } = req.body;

        const usuario = await UsuarioModel.findOne({ where: { Cor_Usuario } });

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const usuarioValido = await bcryptjs.compare(Con_Usuario, usuario.Con_Usuario);

        if (usuarioValido) {
            const token = jwt.sign(
                { user: { Cor_Usuario: usuario.Cor_Usuario, Id_Usuario: usuario.Id_Usuario } },
                process.env.JWT_LLAVE,
                { expiresIn: '1h' }
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

export const verifyToken = async (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];

    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_LLAVE);
            req.user = decoded;
            next();
        } catch (error) {
            console.error('Error de verificación de token:', error);
            res.status(403).json({ message: 'Token inválido o expirado' });
        }
    } else {
        res.status(401).json({ message: 'No se encontró el token' });
    }
};

export const getResetPassword = async (req, res) => {
    const { Cor_Usuario } = req.body;
    try {
        const user = await UsuarioModel.findOne({ where: { Cor_Usuario } });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const tokenForPassword = jwt.sign(
            { user: { Id_Usuario: user.Id_Usuario } },
            process.env.JWT_LLAVE,
            { expiresIn: '1d' }
        );

        await sendPassworResetEmail(Cor_Usuario, tokenForPassword);
        res.status(200).json({ message: 'El mensaje para restablecer contraseña fue enviado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const setNewPassword = async (req, res) => {
    const { tokenForPassword, newPassword } = req.body;
    try {
        const decoded = jwt.verify(tokenForPassword, process.env.JWT_LLAVE);

        const user = await UsuarioModel.findByPk(decoded.user.Id_Usuario);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            const passHash = await bcryptjs.hash(newPassword, 8);

            await UsuarioModel.update(
                { Con_Usuario: passHash },
                { where: { Id_Usuario: decoded.user.Id_Usuario } }
            );

            res.status(200).json({ message: 'Contraseña actualizada correctamente' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Información inválida o el tiempo ha expirado' });
    }
};

export const resetPasswordHandler = async (req, res) => {
    const { id, newPassword } = req.body;

    try {
        // Encuentra al usuario por ID
        const user = await UsuarioModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualiza la contraseña
        user.password = newPassword; // Asegúrate de que la contraseña se encripte antes de guardar

        await user.save();

        res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).json({ message: 'Error al actualizar la contraseña' });
    }
};
