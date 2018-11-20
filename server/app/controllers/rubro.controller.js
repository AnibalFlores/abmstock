const db = require('../configs/db.config');
const Rubro = db.rubro;

// Iniciar datos: Rubros (1 - Sin Rubro)
exports.init = (req, res) => {
	Rubro.create({
		nombre: 'Sin Rubro',
	});

	/*Rubro.create({
		nombre: 'Discos Rigidos',
	});

	Rubro.create({
		nombre: 'Monitores',
	});*/

	// return res.send('Rubros Ok');

}

// Listar todos los Rubros
exports.findAll = (req, res) => {
	Rubro.findAll({
		attributes: ['id', 'nombre'],
	}).then(rubros => {
		res.json(rubros);
	});
}

// Buscar por id
exports.findById = (req, res) => {
	Rubro.findByPk(req.params.id, {
		attributes: ['id', 'nombre']
	}).then(rub => res.json(rub))
};

// Borrar por id
exports.destroy = (req, res) => {
	if (req.params.id > 1) {
		Rubro.destroy({
			where: {
				id: req.params.id
			}
		}).then(response => {
			// puse esta query porque on delete set default no esta en el ORM
			db.sequelize.query('UPDATE articulos SET "rubroId" = 1 WHERE "rubroId" IS NULL');
			res.json(response)})
	} else {
		res.sendStatus(405);// metodo no permitido (de borrar el 1)
	}
}

// Rubro nuevo
exports.create = (req, res) => {
	Rubro.create({
		nombre: req.body.nombre
	}).then(rub => {
		res.send(rub)
		console.log(rub.get())
	})

}

// Actualiza por id
exports.update = (req, res) => {
	Rubro.update({
			nombre: req.body.nombre
		}, {
			where: {
				id: req.params.id
			}
		})
		.then((count) => {
			console.log('Rubros actualizados: ' + count);
			res.json(Rubro.findByPk(req.params.id))
		})
}