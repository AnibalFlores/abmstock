module.exports = (sequelize, Sequelize) => {
    const Itemcompra = sequelize.define('itemcompra', {
        idarticulo: {
            type: Sequelize.INTEGER
        },
        renglon: {
            type: Sequelize.INTEGER
        },
        cantidad: {
            type: Sequelize.INTEGER
        },
        codigoproducto: {
            type: Sequelize.STRING
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