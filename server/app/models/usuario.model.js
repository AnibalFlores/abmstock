module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
	  usuario: {
		  type: Sequelize.STRING
	  },
	  clave: {
		  type: Sequelize.STRING
		},
		rol: {
			type: Sequelize.CHAR
		}
	});
	
	return User;
}