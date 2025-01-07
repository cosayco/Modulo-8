const db = require('../models')
const jwt = require('jsonwebtoken');
const User = db.users
const Bootcamp = db.bootcamps
const SECRET_KEY = require('../config/auth.config').secret

// Crear y Guardar Usuarios
exports.createUser = (req, res) => {
  const user = { ...req.body }
  return User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    })
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(400).json({ error: `>> Error al crear el usuario ${err.message}` })
    })
}

// obtener los bootcamp de un usuario
exports.findUserById = (req, res) => {
  return User.findByPk(req.params.id, { include: [{
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["id", "title"],
        through: { attributes: [], } }, ],
    })
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(400).json({ error: `>> Error mientras se encontraba los usuarios: ${err.message}` })
    })
}

// obtener todos los Usuarios incluyendo los bootcamp
exports.findAll = (req, res) => {
  return User.findAll({ include: [{
      model: Bootcamp,
      as: "bootcamps",
      attributes: ["id", "title"],
      through: { attributes: [], } }, ],
  }).then(users => {
    res.json(users);
  }).catch(err => {
    res.status(400).json({ error: `>>Error al obtener los usuarios: ${err.message}` });
  });
}

// Actualizar usuarios
exports.updateUserById = (req, res) => {
  const userId = req.params.id
  const { fName, lName } = req.body
  return User.update({
      firstName: fName,
      lastName: lName
    }, {
      where: {
        id: userId
      }
    })
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.status(400).json({ error: `>> Error mientras se actualizaba el usuario: ${err.message}` })
    })
}

// Actualizar usuarios
exports.deleteUserById = (req, res) => {
  const userId = req.params.id
  return User.destroy({
      where: {
        id: userId
      }
    })
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.status(400).json({ error: `>> Error mientras se eliminaba el usuario: ${err.message}` })
    })
}

// Validar Ingreso de Usuario
exports.signUser = (req, res) => {
    const { email, password } = req.body;

    return User.findOne({ where: { email: email} })
    .then(user => {
      if (user.password === password) {
        const token = jwt.sign(
          {
            sub: 1,
            role: 'admin',
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 3600,
          },
          SECRET_KEY,
          { algorithm: 'HS256' }
        );
        return res.json({ token });
      }
      return res.status(401).json({ message: 'Credenciales inválidas' });
    })
    .catch(err => {
      res.status(400).json({ error: `>> Error al iniciar sesión: ${err.message}` })
    });
  }    