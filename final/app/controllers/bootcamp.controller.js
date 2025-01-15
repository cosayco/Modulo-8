const db = require('../models')
const Bootcamp = db.bootcamps
const User = db.users

// Crear y guardar un nuevo bootcamp
exports.createBootcamp = (req, res) => {
  if (!req.body.title || !req.body.cue || !req.body.description ) {
    res.status(400).json({ error: '>> Faltan datos' })
    return    
  }

  const bootcamp = { 
    title: req.body.title,
    cue: req.body.cue,
    description: req.body.description
  }

  return Bootcamp.create(bootcamp)
    .then(bootcamp => {
      res.status(201).json(bootcamp)
    })
    .catch(err => {
      res.status(400).json({ error: `>> Error al crear el bootcamp: ${err.message}` })
    })
}

// obtener los bootcamp por id 
exports.findById = (req, res) => {
  return Bootcamp.findByPk(req.params.id, { include: [{
        model: User,
        as: "users",
        attributes: ["id", "firstName", "lastName"],
        through: { attributes: [], } }, ],
    })
    .then(bootcamp => {
      res.json(bootcamp);
    })
    .catch(err => {
      res.status(400).json({ error: `>> Error mientras se encontraba el bootcamp: ${err.message}` });
    })
}

// obtener todos los Usuarios incluyendo los Bootcamp
exports.findAll = (req, res) => {
  return Bootcamp.findAll({ order: [ ["id", "ASC"] ], include: [{ 
      model: User,
      as: "users",
      attributes: ["id", "firstName", "lastName"],
      through: { attributes: [], }}, ],
  }).then(bootcamps => {
    res.json(bootcamps);
  }).catch((err) => {
    res.status(400).json({ error: `>> Error Buscando los Bootcamps: ${err.message}` });
  });
}

// Agregar un Usuario al Bootcamp
exports.addUser = (req, res) => {
  const { bootcampId, userId } = req.body

  return Bootcamp.findByPk(bootcampId)
    .then((bootcamp) => {
      if (!bootcamp) {
        return res.status(400).json({ Mensaje: "Bootcamp no encontrado."});
      }
      return User.findByPk(userId).then((user) => {
        if (!user) {
          return res.status(400).json({ Mensaje: "Usuario no encontrado."});
        }
        bootcamp.addUser(user);
        return res.status(200).json(bootcamp);
      });
    })
    .catch((err) => {
      return res.status(500).json({ message: "Error mientras se estaba agregando Usuario al Bootcamp." });
    });
};
