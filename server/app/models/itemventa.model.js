module.exports = (sequelize, Sequelize) => {
    const Itemventa = sequelize.define('itemventa', {
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
        tableName: 'itemsventas',
        timestamps: false,
    });
    return Itemventa;
}