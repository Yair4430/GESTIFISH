// controllers/resetPasswordController.js
import UsuarioModel from '../models/UsuarioModel.js'; // Importa el modelo de usuario
import jwt from 'jsonwebtoken'; // Asegúrate de instalar jsonwebtoken

// Función para restablecer la contraseña
const resetPassword = async (req, res) => {
    const { tokenForPassword, newPassword } = req.body;

    try {
        // Verifica el token (esto depende de cómo hayas implementado el token)
        const decoded = jwt.verify(tokenForPassword, process.env.JWT_SECRET); // Usa tu clave secreta

        // Encuentra al usuario por ID (o por alguna otra información del token)
        const user = await UsuarioModel.findByPk(decoded.userId);
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado.' });
        }

        // Actualiza la contraseña del usuario
        await user.setPassword(newPassword);

        // Responde con éxito
        res.status(200).json({ message: 'Contraseña actualizada exitosamente.' });
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        res.status(500).json({ message: 'Error al intentar restablecer la contraseña.' });
    }
};

export default { resetPassword };
