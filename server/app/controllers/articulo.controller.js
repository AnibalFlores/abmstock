const db = require('../configs/db.config.js');
const Articulo = db.articulo;
const Rubro = db.rubro;

// Iniciar datos: Articulos
exports.init = (req, res) => {

	Articulo.create({
		codigo: 1,
		nombre: 'Hard Disk Sata Seagate 3Tb',
		descripcion: 'Disco Rigido 3Tb',
		preciocompra: 2500.85,
		precioventa: 3220.25,
		cantidad: 10
	}).then(articulo => {
		Rubro.create({
				nombre: 'Discos Rigidos'
			})
			.then(rub =>
				articulo.setRubro(rub));
	});

	Articulo.create({
		codigo: 2,
		nombre: 'Monitor Led 19" Samsung',
		descripcion: 'Monitor LED 19" SAMSUNG mod. HTN3452',
		preciocompra: 3778.25,
		precioventa: 4340.45,
		cantidad: 5
	}).then(articulo => {
		Rubro.create({
				nombre: 'Monitores'
			})
			.then(rub =>
				articulo.setRubro(rub));
	});

	return res.send('Articulos Ok');

};

// Listar todos los articulos y sus rubros
exports.findAll = (req, res) => {
	Articulo.findAll({
		attributes: ['codigo', 'nombre', 'descripcion', 'preciocompra', 'precioventa', 'cantidad'],
		include: [{
			model: Rubro,
			attributes: ['nombre'],
			as: 'Rubro',
		}]
	}).then(articulos => {
		res.json(articulos);
	});
};