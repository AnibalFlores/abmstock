var express = require('express');
var app = express();
// var bodyParser = require('body-parser'); <-- body parser deprecado ahora incluido en express
// app.use(bodyParser.json())
app.use(express.json())

const db = require('./app/configs/db.config');

  
// el "force: true" borra todas las tablas y las crea de nuevo en cada ejecucion
db.sequelize.sync({force: true}).then(() => {
  console.log('**** Dropado todo y Resync con { force: true } ****');
});

// cargamos todos los routes de la app
require('./app/routes/route.js')(app);// 

// Iniciamos el Server
db.env.listenOn
var server = app.listen(db.env.puerto,db.env.listenOn, function () {
  console.log("Server corriendo en http://%s:%s", server.address().address
  , server.address().port)
})