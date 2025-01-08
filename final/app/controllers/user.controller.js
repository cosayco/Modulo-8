const db = require('../models')
const jwt = require('jsonwebtoken');
const bcript = require('bcryptjs');
const User = db.users;
const Bootcamp = db.bootcamps;
const SECRET_KEY = require('../config/auth.config').secret;
const { verifysignUp, verifyToken } = require('../middleware');

// Crear y Guardar Usuarios
exports.createUser = (req, res) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
    res.status(400).json({ error: '>> Faltan datos' })
    return
  }

  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcript.hashSync(req.body.password)
  }

  return User.create(user)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(400).json({ error: `>> Error al crear el usuario ${err.message}` })
    })
}

// obtener los bootcamp de un usuario
exports.findUserById = (req, res) => {
  verifyToken(req, res);

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
  if (!req.body.firstName || !req.body.lastName || !req.body.email) {
    res.status(400).json({ error: '>> Faltan datos' })
    return
  }

  const userId = req.params.id
  const { firstName, lastName, email } = req.body
  return User.update({
      firstName: firstName,
      lastName: lastName,
      email: email
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

    console.log(password)
    console.log(bcript.hashSync(password))

    return User.findOne({ where: { email: email} })
    .then(user => {
      bcript.compare(password, user.password, (err, result) => {
        if (result) {
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
      });
    })
    .catch(err => {
      res.status(400).json({ error: `>> Error al iniciar sesión: ${err.message}` })
    });
  }    