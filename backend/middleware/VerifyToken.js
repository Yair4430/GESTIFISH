export const verifyToken = (req, res, next) => {
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