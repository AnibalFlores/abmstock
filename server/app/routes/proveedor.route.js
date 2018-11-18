module.exports = function(app) {
 
    const proveedor = require('../controllers/proveedor.controller');
     
    // Iniciar datos: add Proveedores & Telefonos
    app.get('/api/proveedores/iniciar', proveedor.init);
 
    // Trae todos los proveedores (incluye los Telefonos)
    app.get('/api/proveedores/', proveedor.findAll);
}