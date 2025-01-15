const db = require('../models');
const User = db.users;

const verifySignUp = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email }});
    if (user) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Error en la verificación del correo electrónico.' });
  }
};

module.exports = verifySignUp;
