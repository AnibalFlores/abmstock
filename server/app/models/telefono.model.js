module.exports = (sequelize, Sequelize) => {
	const Telefono = sequelize.define('telefono', {
	  numero: {
		  type: Sequelize.STRING
	  },
	  contacto: {
		  type: Sequelize.STRING
      },
      nota: {
        type: Sequelize.STRING
    }      
    },
    {
        tableName: 'telefonos',
        timestamps: false,
    }
    );
	
	return Telefono;
}