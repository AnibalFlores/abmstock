const db = require('../configs/db.config');
const Rubro = db.rubro;

// Iniciar datos: Proveedores & Telefonos
exports.init = (req, res) => {

	Rubro.create({
		nombre: 'Discos Rigidos',
		});

    Rubro.create({
        nombre: 'Monitores',
        });

	// return res.send('Rubros Ok');

};

// Listar todos los Rubros
exports.findAll = (req, res) => {
	Rubro.findAll({
		attributes: ['id', 'nombre'],
    }).then(rubros => {
		res.json(rubros);
	});
};