module.exports = function(app) {
    require('./articulo.route')(app);
    require('./proveedor.route')(app);
    require('./cliente.route')(app);
}
