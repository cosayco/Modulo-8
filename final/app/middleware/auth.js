const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'Acceso denegado' });
    }
    try {
        const decoded = jwt.verify(token, 'clave_secreta');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send({ error: 'Token inválido' });
    }
};

module.exports = auth;
