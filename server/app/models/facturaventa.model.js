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

    }, { // las facturas emitida deben tener tipo pv y nro únicos
        indexes: [{
            unique: true,
            fields: ['tipo', 'puntoventa', 'numero']
        }],
        tableName: 'facturasventas',
        timestamps: true,
    });
    return Facturaventa;
}