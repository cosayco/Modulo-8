const db = require('../models');
const User = db.users; // Asegúrate de ajustar la ruta a tu modelo de usuario

const verifySignUp = (req, res, next) => {
  try {
    // Verificar si el correo electrónico ya existe en la base de datos
    const user = User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error en la verificación del correo electrónico.' });
  }
};

module.exports = verifySignUp;
