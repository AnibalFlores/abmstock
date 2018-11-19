const db = require('../configs/db.config');
const Usuario = db.usuario;
const Op = db.Sequelize.Op;

// Iniciar datos: Usuarios & roles
exports.init = (req, res) => {
	Usuario.create({
		usuario: 'admin',
		clave: 'admin',
		rol: 'A'
	});
	
    Usuario.create({
		usuario: 'compra',
		clave: 'compra',
		rol: 'C'
	});
    
    Usuario.create({
		usuario: 'vende',
		clave: 'vende',
		rol: 'V'
	});
	
	// return res.send('Usuarios Ok');

};

// Listar todos los Proveedores con sus telefonos
exports.findAll = (req, res) => {
	Usuario.findAll({
		attributes: ['usuario', 'clave', 'rol']		
	}).then(users => {
		res.json(users);
    });
};

// Login devuelve usuario validado o null (por error)
exports.login = (req, res) => {
	
	Usuario.findOne({
        where: {
            usuario: req.body.usuario,
            [Op.and]: {clave: req.body.clave}
               }		
	}).then(usuario => {
		if (!usuario)
        res.json(null);
        else
        res.json(usuario);
	});

};