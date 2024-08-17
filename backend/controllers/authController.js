import bcryptjs from 'bcryptjs';
import UsuarioModel from '../models/usuarioModel.js';
import jwt from 'jsonwebtoken';
import { sendPassworResetEmail } from '../servicios/emailService.js';


// const SECRET_KEY = process.env.JWT_LLAVE 'idbhaosuydbfoyaebfuyopjw'

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
        let passHash = await bcryptjs.hash(Con_Usuario, 8);
        const newUser = await UsuarioModel.create({
            Nom_Usuario,
            Ape_Usuario,
            Cor_Usuario,
            Con_Usuario: passHash,
        });

        const tokenUser = jwt.sign({ user: { Cor_Usuario: newUser.Cor_Usuario } }, process.env.JWT_LLAVE, { expiresIn: '1h' });
        res.json({ tokenUser });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logInUser = async (req, res) => {
    try {
    const { Cor_Usuario, Con_Usuario } = req.body;

    // Busca el usuario en la base de datos usando el correo en texto claro
        const usuario = await UsuarioModel.findOne({ where: { Cor_Usuario } });

        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Verifica la contraseña
        const usuarioValido = await bcryptjs.compare(Con_Usuario, usuario.Con_Usuario);

        if (usuarioValido) {
            const token = jwt.sign({ id: usuario.Id_Usuario }, process.env.JWT_LLAVE, { expiresIn: '1h' });
            res.json({ tokenUser: token });
        } else {
            res.status(401).json({ error: "Contraseña incorrecta" });
        }
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ error: "Error del servidor" });
    }
};

export const verifyToken = (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado' });
    }

    try {
        const decodificado = jwt.verify(token, process.env.JWT_LLAVE);
        req.user = decodificado;
        res.status(200).json({ message: 'Token válido' });
    } catch (error) {
        res.status(400).json({ message: 'Token inválido' });
    }
};

export const getResetPassword = async (req, res) => {
    const { Cor_Usuario } = req.body;
    console.log('Petición para restablecer contraseña recibida para:', Cor_Usuario);

    const user = await UsuarioModel.findOne({ where: { Cor_Usuario } });

    if (!user) {
        console.log('Usuario no encontrado:', Cor_Usuario);
        res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
        console.log('Usuario encontrado:', user);
        const tokenForPassword = jwt.sign({ user: { Id_Usuario: user.Id_Usuario, Nom_Usuario: user.Nom_Usuario, Ape_Usuario: user.Ape_Usuario, Cor_Usuario: user.Cor_Usuario } }, process.env.JWT_LLAVE, { expiresIn: '1d' });
        console.log('Token generado:', tokenForPassword);
        await sendPassworResetEmail(Cor_Usuario, tokenForPassword);
        res.status(200).json({ message: 'El mensaje para restablecer contraseña fue enviado correctamente' });
    }
};

export const setNewPassword = async (req, res) => {
    const { tokenForPassword, newPassword } = req.body;
    try {
        console.log('Token recibido:', tokenForPassword);
        const decodificado = jwt.verify(tokenForPassword, process.env.JWT_LLAVE);
        console.log('Token decodificado:', decodificado);

        const user = await UsuarioModel.findByPk(decodificado.user.Id_Usuario);
        console.log('Usuario encontrado:', user);

        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
        } else {
            let passHash = await bcryptjs.hash(newPassword, 6);

            await UsuarioModel.update({
                Con_Usuario: passHash
            }, { where: { Id_Usuario: decodificado.user.Id_Usuario } });

            res.status(200).json({ message: 'Contraseña actualizada correctamente' });
        }

    } catch (error) {
        res.status(400).json({ message: 'Información inválida o el tiempo ha expirado' });
    }
};
