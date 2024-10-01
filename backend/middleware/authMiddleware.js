export const verifyToken = async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_LLAVE);
        console.log("Token decoded ", decoded)
        req.user = decoded; // Almacena los datos del usuario decodificado en `req.user`
        next(); // Continúa con la ruta protegida
      } catch (error) {
        res.status(403).json({ message: "Token inválido o expirado" });
      }
    } else {
      res.status(401).json({ message: "No se encontró el token" });
    }
  };


/*import jwt from 'jsonwebtoken';

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
};*/