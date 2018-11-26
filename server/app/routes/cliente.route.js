module.exports = function(app) {
 
    const cliente = require('../controllers/cliente.controller.js');
 
    // Iniciar datos: add Proveedores & Telefonos
    app.get('/api/clientes/iniciar', cliente.init);

    // Trae todos los proveedores (incluye los Telefonos)
    app.get('/api/clientes/', cliente.findAll);

    // busca un articulo por su id
    app.get('/api/cliente/:id', cliente.findById);

    // Borra un articulo por su id
    app.delete('/api/clienteborrar/:id', cliente.destroy);

    // Inserta un articulo nuevo
    app.post('/api/clientenuevo/', cliente.create);

    // Actualiza un articulo por su id
    app.put('/api/clienteupdate/:id', cliente.update);

}