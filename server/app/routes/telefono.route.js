module.exports = function (app) {
    const telefono = require('../controllers/telefono.controller');

    // Iniciar datos: add telefonos del sistema
    app.get('/api/telefonos/iniciar', telefono.init);

    // Trae todos los telefonos
    app.get('/api/telefonos/', telefono.findAll);

    // busca un telefono por su id
    app.get('/api/telefono/:id', telefono.findById);

    // Borra un telefono por su id
    app.delete('/api/telefonoborrar/:id', telefono.destroy);

    // Inserta un telefono nuevo
    app.post('/api/telefononuevo/', telefono.create);

    // Actualiza un telefono por su id
    app.put('/api/telefonoupdate/:id', telefono.update);

    // Asocia un telefono a un proveedor
    app.post('/api/telefonoproveedor/', telefono.aproveedor);

    // Asocia un telefono a un cliente
    app.post('/api/telefonocliente/', telefono.acliente);
    
}