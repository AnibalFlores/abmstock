module.exports = function(app) {
 
    const articulos = require('../controllers/articulo.controller.js');
 
    // endpoints
    
    // Iniciar datos: add Articulos & Rubros
    app.get('/api/articulos/iniciar', articulos.init);
 
    // Trae todos los articulos (incluye los rubros)
    app.get('/api/articulos', articulos.findAll);

    // Trae todos los articulos en stock (incluye los rubros)
    app.get('/api/stock', articulos.findAllStock);

    // busca un articulo por su id
    app.get('/api/articulo/:id', articulos.findById);

    // Borra un articulo por su id
     app.delete('/api/articuloborrar/:id', articulos.destroy);

    // Inserta un articulo nuevo
    app.post('/api/articulonuevo/', articulos.create);

    // Actualiza un articulo por su id
    app.put('/api/articuloupdate/:id', articulos.update);
}