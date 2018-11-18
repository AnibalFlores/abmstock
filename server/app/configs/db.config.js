const env = require('./env.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.usuario, env.clave, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
  paranoid: false,
  logging: true,
  pool: {
    max: env.max,
    min: env.min,
    acquire: env.acquire,
    idle: env.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.env = env;

// require explicado https://medium.freecodecamp.org/requiring-modules-in-node-js-everything-you-need-to-know-e7fbd119be8
// aca le puse @asociaciones asi me lo lista primero dentro de models y lo desovillo mas rapido
require('../models/@asociaciones')(db,sequelize,Sequelize); // esto es como un funcion(args) pero a la node

module.exports = db;