const db = require('../configs/db.config.js');
const Op = db.Sequelize.Op;
const Articulo = db.articulo;
const Rubro = db.rubro;

// Iniciar datos: Articulos
exports.init = (req, res) => {

	Articulo.create({
		codigo: 'HD1',
		nombre: 'Hard Disk Sata Seagate 3Tb',
		descripcion: 'Disco Rigido 3Tb',
		preciocompra: 2500.85,
		precioventa: 3220.25,
		cantidad: 0
	}).then(articulo => {
		Rubro.create({
				nombre: 'Discos Rigidos'
			})
			.then(rub =>
				articulo.setRubro(rub));
	});

	Articulo.create({
		codigo: 'MT2',
		nombre: 'Monitor Led 19" Samsung',
		descripcion: 'Monitor LED 19" SAMSUNG mod. HTN3452',
		preciocompra: 3778.25,
		precioventa: 4340.45,
		cantidad: 0
	}).then(articulo => {
		Rubro.create({
				nombre: 'Monitores'
			})
			.then(rub =>
				articulo.setRubro(rub));
	});

	Articulo.create({
		codigo: 'MM1',
		nombre: 'Mouse Op. Logitech M100',
		descripcion: 'Mouse Optico Logitech Mod. M100',
		preciocompra: 100.25,
		precioventa: 150.65,
		cantidad: 0
	}).then(articulo => {
		Rubro.create({
				nombre: 'Mouses'
			})
			.then(rub =>
				articulo.setRubro(rub));
	});

	// return res.send('Articulos Ok');

};

// Listar todos los articulos y sus rubros
exports.findAll = (req, res) => {
	Articulo.findAll({
		attributes: ['id', 'codigo', 'nombre', 'descripcion', 'preciocompra', 'precioventa', 'cantidad'],
		include: [{
			model: Rubro,
			attributes: ['id', 'nombre'],
			as: 'rubro',
		}]
	}).then(articulos => {
		res.json(articulos);
	});
};

// Listar todos los articulos y sus rubros con cantidad mayor a cero
exports.findAllStock = (req, res) => {
	Articulo.findAll({
		attributes: ['id', 'codigo', 'nombre', 'descripcion', 'preciocompra', 'precioventa', 'cantidad'],
		include: [{
			model: Rubro,
			attributes: ['id', 'nombre'],
			as: 'rubro',
		}],
		where: {
			cantidad: {
				[Op.gt]: 0
			}
		}
	}).then(articulos => {
		res.json(articulos);
	});
};

exports.findById = (req, res) => {
	Articulo.findByPk(req.params.id, {
		attributes: ['id', 'codigo', 'nombre', 'descripcion', 'preciocompra', 'precioventa', 'cantidad'],
		include: [{
			model: Rubro,
			attributes: ['id', 'nombre'],
			as: 'rubro',
		}]
	}).then(art => res.json(art))
};

exports.destroy = (req, res) => {
	Articulo.destroy({
		where: {
			id: req.params.id
		}
	}).then(response => res.json(response))
}

exports.create = (req, res) => {
	Articulo.create({
		codigo: req.body.codigo,
		nombre: req.body.nombre,
		descripcion: req.body.descripcion,
		preciocompra: req.body.preciocompra,
		precioventa: req.body.precioventa,
		cantidad: req.body.cantidad
	}).then(art => {
		art.setRubro(req.body.rubro.id)
		res.send(art)
		console.log(art.get())
	})

}

exports.update = (req, res) => {
	Articulo.update({
			codigo: req.body.codigo,
			nombre: req.body.nombre,
			descripcion: req.body.descripcion,
			preciocompra: req.body.preciocompra,
			precioventa: req.body.precioventa,
			cantidad: req.body.cantidad,
			rubroId: req.body.rubro.id
		}, {
			where: {
				id: req.params.id
			}
		})
		.then((count) => {
			console.log('Artículos actualizados: ' + count);
			res.json(Articulo.findByPk(req.params.id))
		})

}