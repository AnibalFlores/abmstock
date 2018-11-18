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
    }, {        
        tableName: 'facturascompras',
        timestamps: false,
    });
    return Facturacompra;
}