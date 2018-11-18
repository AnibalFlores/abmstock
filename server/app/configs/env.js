// mis variables de ambiente 
const env = {
  // para el express
  listenOn: 'localhost',
  puerto: 3000,
  // para el postgres
  database: 'Stock',
  usuario: 'postgres',
  clave: 'postgres',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  // http://docs.sequelizejs.com/manual/installation/usage.html
  // pool de conexiones
  max: 5,
  min: 0,
  idle: 30000,
  acquire: 60000,
  
};

module.exports = env;