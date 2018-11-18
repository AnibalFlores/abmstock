module.exports = (db,sequelize,Sequelize) => {
    
    // Aca importo las entidades a asociar una por una

    db.telefono = require('../models/telefono.model')(sequelize, Sequelize);
    db.proveedor = require('../models/proveedor.model')(sequelize, Sequelize);
    db.cliente = require('../models/cliente.model')(sequelize, Sequelize);
    db.rubro = require('../models/rubro.model')(sequelize, Sequelize);
    db.articulo = require('../models/articulo.model')(sequelize, Sequelize);
    db.facturacompra = require('../models/facturacompra.model')(sequelize, Sequelize);
    db.facturaventa = require('../models/facturaventa.model')(sequelize, Sequelize);
    db.itemcompra = require('../models/itemcompra.model')(sequelize, Sequelize);
    db.itemventa = require('../models/itemventa.model')(sequelize, Sequelize);

    // Aca definimos lo importante y complicado las asociaciones en la DB

    // Ejemplo asociaciones n:m 
    // una tabla join proveedores_telefonos para guardar multiples telefonos por proveedor
    db.proveedor.belongsToMany(db.telefono, {
        as: 'Telefonos',
        through: 'proveedores_telefonos',
        timestamps: false,
        foreignKey: 'id',
        otherKey: 'telefonoId'
    });
    db.telefono.belongsToMany(db.proveedor, {
        as: 'Proveedores',
        through: 'proveedores_telefonos',
        timestamps: false,
        foreignKey: 'telefonoId',
        otherKey: 'id'
    });

    // una tabla clientes_telefonos para guardar multiples telefonos por cliente
    db.cliente.belongsToMany(db.telefono, {
        as: 'Telefonos',
        through: 'clientes_telefonos',
        timestamps: false,
        foreignKey: 'id',
        otherKey: 'telefonoId'
    });
    db.telefono.belongsToMany(db.cliente, {
        as: 'Clientes',
        through: 'clientes_telefonos',
        timestamps: false,
        foreignKey: 'telefonoId',
        otherKey: 'id'
    });

    // lo mismo seria con por ejemplo domicilios varias entidades comparten la tabla domicilios via tablas join auxiliares de nombre: entidad_domicilio 
    // no hice domicilios pero seria igual a lo anterior

    // Ejemplo más sencillo 1:N 
    // Un rubro tiene registro de varios articulos en tabla articulos tendremos una fk rubroId
    db.rubro.hasMany(db.articulo, {
        as: 'Articulos'
    });
    db.articulo.belongsTo(db.rubro, {
        as: 'Rubro'
    });

    // Ahora vamos por las consignas de facturación
    // una factura de compra tiene varios items de compra 
    db.facturacompra.hasMany(db.itemcompra, {
         as: 'Items', onDelete: 'cascade'
    });
    // una factura de venta tiene varios items de venta
    db.facturaventa.hasMany(db.itemventa, {
        as: 'Items', onDelete: 'cascade'
   });

   // un proveedor tiene varias facturas de compra
   db.proveedor.hasMany(db.facturacompra, {
       as: 'Facturas' 
    })

   // un cliente tiene varias facturas de venta
   db.cliente.hasMany(db.facturaventa, {
    as: 'Facturas'
 })

    //db.profesor.hasMany(db.profesor, {
    //    as: 'subordinados',
    //    foreignKey: 'superior'
    //});
    // Cada Profesor responde a un solo jefe
    //db.profesor.belongsTo(db.profesor, {
    //    as: 'jefe',
    //    foreignKey: 'superior'
    //});
    
    return db; //comente esta linea porque hago un require explicito sin asignacion desde db.config.js
}