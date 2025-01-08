const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/auth.config').secret;

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No se proporcionó un token.' });
  }

  // Eliminar la palabra 'Bearer ' del token si está presente
  token = token.replace(/^Bearer\s+/, "");

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'No autorizado.' });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;

