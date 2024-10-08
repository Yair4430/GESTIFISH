import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  const tokenWithoutBearer = token.split(' ')[1]; // Remover "Bearer" si está incluido en la autorización

  jwt.verify(tokenWithoutBearer, process.env.JWT_LLAVE, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado.' });
    }
    req.user = user;
    next();
  });
};

export default authenticateToken;