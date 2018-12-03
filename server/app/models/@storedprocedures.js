module.exports = (db, sequelize, Sequelize) => {
    // Activar word warp para ver mejor
    // Trigger para postgres que actualiza cantidades y precios de compra de
    // los articulos por cada item de factura de compra insertado
    // las cantidades se suman y los precios de compra se promedian (sistema PPP)
    const compras_procedure = "CREATE OR REPLACE FUNCTION suma_cantidades() RETURNS trigger AS $$ DECLARE _cantidadviejo integer; _precioviejo numeric; _totalviejo numeric; _totalnuevo numeric; _precionuevo numeric; _cantidadnueva integer; BEGIN SELECT preciocompra, cantidad INTO _precioviejo, _cantidadviejo FROM articulos WHERE id = new.idarticulo; _totalviejo = _precioviejo * _cantidadviejo; _totalnuevo = new.preciounitario * new.cantidad; _cantidadnueva = _cantidadviejo + new.cantidad; _precionuevo = (_totalviejo + _totalnuevo) / _cantidadnueva; UPDATE articulos SET cantidad = _cantidadnueva, preciocompra = _precionuevo WHERE id = new.idarticulo; RETURN NULL; END; $$ LANGUAGE plpgsql VOLATILE;";
    const itemcompratrigger = "CREATE TRIGGER sumacantidades AFTER INSERT OR UPDATE ON itemscompras FOR EACH ROW EXECUTE PROCEDURE suma_cantidades();";
    // Trigger para postgres que actualiza cantidades y precios de venta de
    // los articulos por cada item de factura de venta insertado
    // las cantidades se restan y los precios de venta se sobrescriben
    // puede dar negativos así el empleado de compras sabe que debe mercaderia urgente
    const ventas_procedure = "CREATE OR REPLACE FUNCTION resta_cantidades() RETURNS trigger AS $$ DECLARE _cantidadviejo integer; _cantidadnueva integer; BEGIN SELECT cantidad INTO _cantidadviejo FROM articulos WHERE id = new.idarticulo; _cantidadnueva = _cantidadviejo - new.cantidad; UPDATE articulos SET cantidad = _cantidadnueva, precioventa = new.preciounitario WHERE id = new.idarticulo; RETURN NULL; END; $$ LANGUAGE plpgsql VOLATILE;";
    const itemventatrigger = "CREATE TRIGGER restacantidades AFTER INSERT OR UPDATE ON itemsventas FOR EACH ROW EXECUTE PROCEDURE resta_cantidades();";

    db.sequelize.query(
            compras_procedure, {
                type: sequelize.QueryTypes.RAW
            })
        .then(function (results) {
            console.log('Stored Procedure de compras hecho.')
        });

    db.sequelize.query(
            itemcompratrigger, {
                type: sequelize.QueryTypes.RAW
            })
        .then(function (results) {
            console.log('Trigger de items compras hecho.')
        });

    db.sequelize.query(
            ventas_procedure, {
                type: sequelize.QueryTypes.RAW
            })
        .then(function (results) {
            console.log('Stored Procedure de ventas hecho.')
        });

    db.sequelize.query(
            itemventatrigger, {
                type: sequelize.QueryTypes.RAW
            })
        .then(function (results) {
            console.log('Trigger de items ventas hecho.')
        });
    return db;
}