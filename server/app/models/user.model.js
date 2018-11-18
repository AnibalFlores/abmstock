module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
	  firstname: {
		  type: Sequelize.STRING
	  },
	  lastname: {
		  type: Sequelize.STRING
	  },
	  age: {
		  type: Sequelize.INTEGER
	  }
	});
	
	return User;
}