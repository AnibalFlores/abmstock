module.exports = (sequelize, Sequelize) => {
    const Proveedor = sequelize.define('proveedor', {
        razonsocial: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cuit: {
            type: Sequelize.STRING,
            allowNull: false
        },
        condicioniva: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: 'proveedores',
        timestamps: false,
    });
    return Proveedor;
}