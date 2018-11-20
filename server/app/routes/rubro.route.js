module.exports = function (app) {
    const rubro = require('../controllers/rubro.controller');

    // Iniciar datos: add rubros del sistema
    app.get('/api/rubros/iniciar', rubro.init);

    // Trae todos los rubros
    app.get('/api/rubros/', rubro.findAll);

    // busca un rubro por su id
    app.get('/api/rubro/:id', rubro.findById);

    // Borra un rubro por su id
    app.delete('/api/rubroborrar/:id', rubro.destroy);

    // Inserta un articulo nuevo
    app.post('/api/rubronuevo/', rubro.create);

    // Actualiza un articulo por su id
    app.put('/api/rubroupdate/:id', rubro.update);
}