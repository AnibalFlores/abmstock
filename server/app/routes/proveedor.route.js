module.exports = function (app) {

    const proveedor = require('../controllers/proveedor.controller');

    // Iniciar datos: add Proveedores & Telefonos
    app.get('/api/proveedores/iniciar', proveedor.init);

    // Trae todos los proveedores (incluye los Telefonos)
    app.get('/api/proveedores/', proveedor.findAll);

    // busca un proveedor por su id
    app.get('/api/proveedor/:id', proveedor.findById);

    // Borra un proveedor por su id
    app.delete('/api/proveedorborrar/:id', proveedor.destroy);

    // Inserta un proveedor nuevo
    app.post('/api/proveedornuevo/', proveedor.create);

    // Actualiza un proveedor por su id
    app.put('/api/proveedorupdate/:id', proveedor.update);

    // FACTURAS COMPRAS

    // Inserta una factura con items a un proveedor por su id
    app.post('/api/proveedornuevafactura/', proveedor.nuevafactura);

    // Trae todas las facturas de compras
    app.get('/api/facturascompras/', proveedor.findAllfacturas);

    // Trae una factura con items a un proveedor por su id
    app.get('/api/proveedorfactura/:id', proveedor.findfacturaById);

    // Trae la ultima factura creada
    app.get('/api/ultimaFacturaCompra', proveedor.findultimafactura);
    

}