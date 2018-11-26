const db = require('../configs/db.config.js');
const Cliente = db.cliente;
const Telefono = db.telefono;

// Init data: Projects & Users
exports.init = (req, res) => {

	Cliente.create({
		razonsocial: 'Ricardo Gonzalez',
		cuit: '23-37564567-8',
		condicioniva: 'Consumidor Final'
	}).then(p => {
		Telefono.create({
				numero: '343-4371813',
				contacto: 'Ricardo Gonzalez',
				nota: 'Telefono de la casa'
			})
			.then(tel =>
				p.addTelefono(tel))
	});

	Cliente.create({
		razonsocial: 'Mr Mouse Computers',
		cuit: '31-125676871-5',
		condicioniva: 'Responsable Inscripto'
	}).then(p => {
		Telefono.create({
				numero: '0343-4312525',
				contacto: 'Marcos Brindisi',
				nota: 'Propietario del local'
			})
			.then(tel =>
				p.addTelefono(tel))
	});

	// return res.send('Clientes Ok');

};

// esto me tiraba la join table "clientes_telefonos" que no quiero 
// Listar todos los clientes con sus telefonos
exports.findAll = (req, res) => {
	Cliente.findAll({
		attributes: ['id', 'razonsocial', 'cuit', 'condicioniva'],
		include: [{
			model: Telefono,
			as: 'telefonos',
			attributes: ['id', 'numero', 'contacto', 'nota'],
			through: {
				attributes: []
			} // ^ aca es fundamental esto para que no agregue esa jodida join table al resultado
		}]
	}).then(clientes => {
		res.json(clientes);
	});
};

exports.findById = (req, res) => {
	Cliente.findByPk(req.params.id, {
		attributes: ['id', 'razonsocial', 'cuit', 'condicioniva'],
		include: [{
			model: Telefono,
			as: 'telefonos',
			attributes: ['id', 'numero', 'contacto', 'nota'],
			through: {
				attributes: []
			} // ^ aca es fundamental esto para que no agregue esa jodida join table al resultado
		}]
	}).then(cli => res.json(cli))
};

exports.destroy = (req, res) => {
	Cliente.destroy({
		where: {
			id: req.params.id
		}
	}).then(response => res.json(response))
}

exports.create = (req, res) => {
	Cliente.create({
		razonsocial: req.body.razonsocial,
		cuit: req.body.cuit,
		condicioniva: req.body.condicioniva
	}).then(cli => {
		cli.addTelefono(req.body.telefonos)
		res.json(cli)
		console.log(cli.get())
	})

}

exports.update = (req, res) => {
	Cliente.update({
			razonsocial: req.body.razonsocial,
			cuit: req.body.cuit,
			condicioniva: req.body.condicioniva,
			telefonos: req.body.telefonos
		}, {
			where: {
				id: req.params.id
			}
		})
		.then((count) => {
			console.log('Clientes actualizados: ' + count);
			res.json(Cliente.findByPk(req.params.id))
		})

}