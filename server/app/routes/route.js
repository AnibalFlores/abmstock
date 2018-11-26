module.exports = function (app) {
    // aca voy agregando comodamente las rutas por modelo
    require('./articulo.route')(app);
    require('./proveedor.route')(app);
    require('./cliente.route')(app);
    require('./usuario.route')(app);
    require('./rubro.route')(app);
    require('./telefono.route')(app);
}