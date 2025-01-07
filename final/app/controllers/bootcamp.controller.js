const db = require('../models')
const Bootcamp = db.bootcamps
const User = db.users

// Crear y guardar un nuevo bootcamp
exports.createBootcamp = (res, req) => {
  const bootcamp = { ...req.body }
  return Bootcamp.create({
      title: bootcamp.title,
      cue: bootcamp.cue,
      description: bootcamp.description,
    })
    .then(bootcamp => {
      res.status(201).json(bootcamp)
    })
    .catch(err => {
      res.status(400).json({ error: `>> Error al crear el bootcamp: ${err.message}` })
    })
}

// Agregar un Usuario al Bootcamp
exports.addUser = (bootcampId, userId) => {
  return Bootcamp.findByPk(bootcampId)
    .then((bootcamp) => {
      if (!bootcamp) {
        console.log("No se encontro el Bootcamp!");
        return null;
      }
      return User.findByPk(userId).then((user) => {
        if (!user) {
          console.log("Usuario no encontrado!");
          return null;
        }
        bootcamp.addUser(user);
        console.log('***************************')
        console.log(` Agregado el usuario id=${user.id} al bootcamp con id=${bootcamp.id}`);
        console.log('***************************')
        return bootcamp;
      });
    })
    .catch((err) => {
      console.log(">> Error mientras se estaba agregando Usuario al Bootcamp", err);
    });
};


// obtener los bootcamp por id 
exports.findById = (res, req) => {
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
  return Bootcamp.findAll({ include: [{ 
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