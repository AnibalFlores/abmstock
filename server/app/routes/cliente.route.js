module.exports = function (app) {

    const cliente = require('../controllers/cliente.controller.js');

    // Iniciar datos: add clientes & Telefonos
    app.get('/api/clientes/iniciar', cliente.init);

    // Trae todos los cliente (incluye los Telefonos)
    app.get('/api/clientes/', cliente.findAll);

    // busca un cliente por su id
    app.get('/api/cliente/:id', cliente.findById);

    // Borra un cliente por su id
    app.delete('/api/clienteborrar/:id', cliente.destroy);

    // Inserta un cliente nuevo
    app.post('/api/clientenuevo/', cliente.create);

    // Actualiza un cliente por su id
    app.put('/api/clienteupdate/:id', cliente.update);

    // Inserta una factura con items a un cliente por su id
    app.post('/api/clientenuevafactura/', cliente.nuevafactura);


}