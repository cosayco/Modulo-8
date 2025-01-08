const db = require('./app/models') // Para inicializar la base de datos
const express = require('express');
const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');

const userRoutes = require('./app/routes/user.routes');
const bootcampRoutes = require('./app/routes/bootcamp.routes');

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', bootcampRoutes);

// //db.sequelize.sync() - Inicializar Base de Datos
// db.sequelize.sync({
//   force: true
// }).then(() => {
//   console.log('Eliminando y resincronizando la base de datos.')
// })

app.listen(PORT, () => {
  console.log(`Servidor Activo en http://localhost:${PORT}/api`);
});