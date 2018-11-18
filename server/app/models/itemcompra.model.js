module.exports = (sequelize, Sequelize) => {
    const Itemcompra = sequelize.define('itemcompra', {
        cantidad: {
            type: Sequelize.INTEGER
        },
        codigoproducto: {
            type: Sequelize.INTEGER
        },
        descripcion: {
            type: Sequelize.STRING
        },
        preciounitario: {
            type: Sequelize.DECIMAL
        },
        iva: {
            type: Sequelize.DECIMAL
        },
        subtotal: {
            type: Sequelize.DECIMAL
        }
    }, {
        tableName: 'itemscompras',
        timestamps: false,
    });
    return Itemcompra;
}