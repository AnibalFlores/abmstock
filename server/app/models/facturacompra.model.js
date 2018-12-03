module.exports = (sequelize, Sequelize) => {
    const Facturacompra = sequelize.define('facturacompra', {
        fecha: {
            type: Sequelize.DATE
        },
        puntoventa: {
            type: Sequelize.INTEGER
        },
        numero: {
            type: Sequelize.INTEGER
        },
        tipo: {
            type: Sequelize.CHAR
        }
    }, {// Nos aseguramos que no tengamos facturas repetidas de un mismo proveedor
        indexes: [{
            unique: true,
            fields: ['proveedorId', 'puntoventa', 'numero', 'tipo']
        }],
        tableName: 'facturascompras',
        timestamps: true,
    });
    return Facturacompra;
}