module.exports = function(app) {
const rubro = require('../controllers/rubro.controller');
     
    // Iniciar datos: add users del sistema
    app.get('/api/rubros/iniciar', rubro.init);
 
    // Trae todos los user (incluye los roles)
    app.get('/api/rubros/', rubro.findAll);
}