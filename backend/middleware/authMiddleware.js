import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // El token se espera en el formato "Bearer <token>"

    console.log('Auth Header:', authHeader);
    console.log('Token:', token);

    if (token == null) return res.sendStatus(401); // Si no hay token, retorna "Unauthorized"

    jwt.verify(token, process.env.JWT_LLAVE, (err, user) => {
        console.log('JWT_LLAVE:', process.env.JWT_LLAVE); // Verifica el valor de la clave secreta
        if (err) return res.sendStatus(403); // Si el token es inválido o expirado, retorna "Forbidden"
        req.user = user; // Agrega el usuario al objeto request
        next(); // Continúa con el siguiente middleware o ruta
    });
};