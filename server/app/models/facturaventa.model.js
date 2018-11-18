module.exports = (sequelize, Sequelize) => {
    const Facturaventa = sequelize.define('facturaventa', {
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

    }, { // las facturas que emitimos deben tener pv-numero únicos
        indexes: [{
            unique: true,
            fields: ['puntoventa', 'numero']
        }],
        tableName: 'facturasventas',
        timestamps: false,
    });
    return Facturaventa;
}