module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define('cliente', {
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
        tableName: 'clientes',
        timestamps: false

    });
    return Cliente;
}