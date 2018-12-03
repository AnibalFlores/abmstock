module.exports = (db, sequelize, Sequelize) => {

    // importo las entidades a asociar una por una

    db.telefono = require('../models/telefono.model')(sequelize, Sequelize);
    db.proveedor = require('../models/proveedor.model')(sequelize, Sequelize);
    db.cliente = require('../models/cliente.model')(sequelize, Sequelize);
    db.rubro = require('../models/rubro.model')(sequelize, Sequelize);
    db.articulo = require('../models/articulo.model')(sequelize, Sequelize);
    db.facturacompra = require('../models/facturacompra.model')(sequelize, Sequelize);
    db.facturaventa = require('../models/facturaventa.model')(sequelize, Sequelize);
    db.itemcompra = require('../models/itemcompra.model')(sequelize, Sequelize);
    db.itemventa = require('../models/itemventa.model')(sequelize, Sequelize);

    db.usuario = require('../models/usuario.model')(sequelize, Sequelize);

    // Aca definimos lo importante y complicado las asociaciones en la DB

    // Ejemplo asociaciones n:m (no es necesario pero lo hice para practicar sequelize)
    // la ventaja es que todos los telefonos esta en un misma tabla y hay 
    // una tabla join proveedores_telefonos para guardar multiples telefonos por proveedor
    db.proveedor.belongsToMany(db.telefono, {
        as: 'telefonos',
        through: 'proveedores_telefonos',
        timestamps: false,
        foreignKey: 'id',
        otherKey: 'telefonoId'
    });
    db.telefono.belongsToMany(db.proveedor, {
        as: 'proveedores',
        through: 'proveedores_telefonos',
        timestamps: false,
        foreignKey: 'telefonoId',
        otherKey: 'id'
    });

    // y una tabla clientes_telefonos para guardar multiples telefonos por cliente
    db.cliente.belongsToMany(db.telefono, {
        as: 'telefonos',
        through: 'clientes_telefonos',
        timestamps: false,
        foreignKey: 'id',
        otherKey: 'telefonoId'
    });
    db.telefono.belongsToMany(db.cliente, {
        as: 'clientes',
        through: 'clientes_telefonos',
        timestamps: false,
        foreignKey: 'telefonoId',
        otherKey: 'id'
    });

    // TODO: lo mismo seria con por ejemplo domicilios varias entidades comparten la tabla domicilios
    // via tablas join auxiliares de nombre: entidad_domicilio 
    // no hice domicilios pero seria igual a lo anterior

    // Ejemplo más sencillo 1:N 
    // Un rubro tiene registro de varios articulos en tabla articulos tendremos una fk rubroId
    db.rubro.hasMany(db.articulo, {
        as: 'articulos'
    });
    db.articulo.belongsTo(db.rubro, {
        as: 'rubro'
    });

    // Ahora vamos por las consignas de facturación
    // una factura de compra tiene varios items de compra 
    db.facturacompra.hasMany(db.itemcompra, {
        as: 'items',
        onDelete: 'cascade'
    });
    // una factura de venta tiene varios items de venta
    db.facturaventa.hasMany(db.itemventa, {
        as: 'items',
        onDelete: 'cascade'
    });

    // Si se borra (solo puede el admin) el cliente o proveedor se eliminan
    // todos los comprobantes de facturas asociados 
    // (en un sistema real no debe ser posible borrar documentos contables
    // pero por simplicidad aplicamos el cascade)

    // un proveedor tiene varias facturas de compra
    db.proveedor.hasMany(db.facturacompra, {
        as: 'facturas',
        onDelete: 'cascade'
    })

    // un cliente tiene varias facturas de venta
    db.cliente.hasMany(db.facturaventa, {
        as: 'facturas',
        onDelete: 'cascade'
    })

    return db; // devolvemos la db con las asociaciones aplicadas
}