module.exports = (sequelize, Sequelize) => {
    const Articulo = sequelize.define('articulo', {
        codigo: {
            type: Sequelize.STRING            
        },
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        preciocompra: {
            type: Sequelize.DECIMAL
        },
        precioventa: {
            type: Sequelize.DECIMAL
        },
        cantidad: {
            type: Sequelize.INTEGER
        }
       
    }, {
        tableName: 'articulos',
        timestamps: false,
    });

    return Articulo;
}