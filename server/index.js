var express = require('express');
var app = express();

// var bodyParser = require('body-parser'); // <-- body parser deprecado ahora incluido en express
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// middleware para corregir error CORS
app.use(function (req, res, next) {
  // modifico los headers para definir las siguientes cositas
  // Websites a los que permitir conexion (* cualquiera peligroso)
  res.setHeader('Access-Control-Allow-Origin', '*');
  // accioness que permitiremos
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Headers que quiero permitir
  res.setHeader('Access-Control-Allow-Headers', 'x-auth, Content-Type');
  // Se pone a true si por ejemplo queremos cookies en las requests a
  // la API seria así
  // res.setHeader('Access-Control-Allow-Credentials', true);
  // Por ultimo pasamos de este middleware a la siguiente capa con next() 
  next();
});

// Definimos la Base de Datos
const db = require('./app/configs/db.config');

// aca importo los controllers solo para llenar la base de datos
// apenas la promesa del sync se ejecute
const usuarios = require('./app/controllers/usuario.controller');
const telefonos = require('./app/controllers/telefono.controller');
const proveedores = require('./app/controllers/proveedor.controller');
const clientes = require('./app/controllers/cliente.controller');
const rubros = require('./app/controllers/rubro.controller');
const articulos = require('./app/controllers/articulo.controller');

// el "force: true" borra todas las tablas y las crea de nuevo en cada ejecucion
// aparte hay triggers en crudo los puse separados en @storedprocedures.js
db.sequelize.sync({
  force: true
}).then(() => {
  console.log('**** Dropado todo y Resync con { force: true } ****');
  
  // genero los triggers para actualizar cantidades automaticamente en la db
  require('./app/models/@storedprocedures')(db, db.sequelize, db.Sequelize);

  // aca lleno las tablas de las entidades básicas el orden es importante
  // sin facturas y algunos articulos informáticos todos en cero unidades 
  usuarios.init();
  telefonos.init();
  proveedores.init();
  clientes.init();
  rubros.init();
  articulos.init();
  console.log('**** Datos iniciales generados con exito ****');
});

// cargamos todos los routes de la server app 
require('./app/routes/route.js')(app); // 

// Iniciamos el Server
db.env.listenOn
var server = app.listen(db.env.puerto, db.env.listenOn, function () {
  console.log("Server corriendo en http://%s:%s", server.address().address, server.address().port)
});