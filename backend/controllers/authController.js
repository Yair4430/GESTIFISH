import bcryptjs from 'bcryptjs';
import UsuarioModel from '../models/usuarioModel.js';
import jwt from 'jsonwebtoken';
import { sendPassworResetEmail } from '../servicios/emailService.js';
import { generarToken } from "../helpers/generarToken.js";

// Expresiones regulares para validación
const nameRegex = /^[a-zA-Z\s]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|edu\.co)$/; // Permite Gmail, Outlook, Hotmail y el dominio del Sena
const passwordRegex = /^(?=.*[.!@#$%^&*])[a-zA-Z0-9.!@#$%^&*]{8,}$/;

// Crear nuevo usuario
export const createUser = async (req, res) => {
    try {
        const { Nom_Usuario, Ape_Usuario, Cor_Usuario, Con_Usuario } = req.body;

        // Validar nombres y apellidos
        if (!nameRegex.test(Nom_Usuario)) {
            return res.status(400).json({ message: 'El nombre solo puede contener letras y espacios' });
        }

        if (!nameRegex.test(Ape_Usuario)) {
            return res.status(400).json({ message: 'El apellido solo puede contener letras y espacios' });
        }

        // Validar correo electrónico
        if (!emailRegex.test(Cor_Usuario)) {
            return res.status(400).json({ message: 'El correo debe tener un formato válido y pertenecer a un dominio permitido' });
        }

        // Validar contraseña
        if (!passwordRegex.test(Con_Usuario)) {
            return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres y contener al menos un carácter especial' });
        }

        // Verificar si el usuario ya existe
        let user = await UsuarioModel.findOne({ where: { Cor_Usuario } });

        if (user) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Crear nuevo usuario
        let passHash = await bcryptjs.hash(Con_Usuario, 12);
        const newUser = await UsuarioModel.create({
            Nom_Usuario,
            Ape_Usuario,
            Cor_Usuario,
            Con_Usuario: passHash,
            Token: generarToken(),
        });

        // Encriptar el Cor_Usuario y Id_Usuario para el token
        const encryptedEmail = await bcryptjs.hash(newUser.Cor_Usuario, 8);
        const encryptedId = await bcryptjs.hash(newUser.Id_Usuario.toString(), 8);

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
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const usuarioValido = await bcryptjs.compare(Con_Usuario, usuario.Con_Usuario);

        if (usuarioValido) {
            // Encriptar el Cor_Usuario y Id_Usuario para el token
            const encryptedEmail = await bcryptjs.hash(usuario.Cor_Usuario, 8);
            const encryptedId = await bcryptjs.hash(usuario.Id_Usuario.toString(), 8);

            const token = jwt.sign(
                { user: { Cor_Usuario: encryptedEmail, Id_Usuario: encryptedId } },
                process.env.JWT_LLAVE,
                { expiresIn: '1h' }
            );

            res.json({ tokenUser: token });
        } else {
            res.status(401).json({ error: 'Contraseña incorrecta' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Verificar token TENER EN CUENTA
/*export const verifyToken = async (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    
    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_LLAVE);
            req.user = decoded; // Almacena los datos del usuario decodificado en `req.user`
            next(); // Continúa con la ruta protegida
        } catch (error) {
            res.status(403).json({ message: 'Token inválido o expirado' });
        }
    } else {
        res.status(401).json({ message: 'No se encontró el token' });
    }
};*/

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

    // Almacenar el token de restablecimiento de contraseña en la base de datos
    user.Token = tokenForPassword;
    await user.save();

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
