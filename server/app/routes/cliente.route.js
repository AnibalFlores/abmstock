module.exports = function(app) {
 
    const clientes = require('../controllers/cliente.controller.js');
 
    // Iniciar datos: add Clientes & Telefonos
    app.get('/api/clientes/iniciar', clientes.init);
 
    // Trae todos los clientes (incluye los Telefonos)
    app.get('/api/clientes', clientes.findAll);
}