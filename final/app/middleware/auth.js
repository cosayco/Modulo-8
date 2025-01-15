const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../config/auth.config').secret;

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  console.log(token);

  if (!token) { 
    return res.status(403).send('No se proporcionó un token.'); 
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send('No autorizado.');
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;

