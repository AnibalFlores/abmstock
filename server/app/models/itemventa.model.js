module.exports = (sequelize, Sequelize) => {
    const Itemventa = sequelize.define('itemventa', {
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
        tableName: 'itemsventas',
        timestamps: false,
    });
    return Itemventa;
}