module.exports = function(app) {
 
    const articulos = require('../controllers/articulo.controller.js');
 
    // Iniciar datos: add Articulos & Telefonos
    app.get('/api/articulos/iniciar', articulos.init);
 
    // Trae todos los articulos (incluye los rubros)
    app.get('/api/articulos', articulos.findAll);
}