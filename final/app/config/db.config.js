module.exports = {
  HOST: 'localhost',
  USER: 'cduran',
  PASSWORD: 'cduran',
  DB: 'db_jwtbootcamp',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}