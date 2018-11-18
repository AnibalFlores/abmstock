module.exports = (sequelize, Sequelize) => {
    const Rubro = sequelize.define('rubro', {
        nombre: {
            type: Sequelize.STRING
        }
    }, {
        tableName: 'rubros',
        timestamps: false,
    });

    return Rubro;
}