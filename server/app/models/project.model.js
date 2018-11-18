module.exports = (sequelize, Sequelize) => {
	const Project = sequelize.define('project', {
	  code: {
		  type: Sequelize.STRING
	  },
	  name: {
		  type: Sequelize.STRING
	  }
	});
	
	return Project;
}