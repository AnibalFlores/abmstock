const db = require('../configs/db.config');
const Telefono = db.telefono;
const Proveedor = db.proveedor;
const Cliente = db.cliente;

// Iniciar datos: Telefonos (1 - Sin Telefono)
exports.init = (req, res) => {
	Telefono.create({
        numero: 'Sin Telefono',
        contacto: '',
        nota: ''
	});

}

// Listar todos los Telefonos
exports.findAll = (req, res) => {
	Telefono.findAll({
		attributes: ['id', 'numero', 'contacto', 'nota']
	}).then(telefonos => {
		res.json(telefonos);
	});
}

// Buscar por id
exports.findById = (req, res) => {
	Telefono.findByPk(req.params.id, {
		attributes: ['id', 'numero', 'contacto', 'nota']
	}).then(tel => res.json(tel))
};

// Borrar por id
exports.destroy = (req, res) => {
	if (req.params.id > 1) {
		Telefono.destroy({
			where: {
				id: req.params.id
			}
		}).then(response => {
			// puse esta query porque on delete set default no esta en el ORM
			// db.sequelize.query('UPDATE articulos SET "rubroId" = 1 WHERE "rubroId" IS NULL');
			res.json(response)})
	} else {
		res.sendStatus(405);// metodo no permitido (de borrar el 1)
	}
}

// Telefono nuevo
exports.create = (req, res) => {
	Telefono.create({
        numero: req.body.numero,
        contacto: req.body.contacto,
        nota: req.body.nota
	}).then(tel => {
		res.send(tel)
		console.log(tel.get())
	})

}

// Telefono nuevo a prooveedor
exports.aproveedor = (req, res) => {
	db.sequelize.query('INSERT INTO proveedores_telefonos VALUES (:provId, :telId)',{
		replacements: {
			provId: req.body.idprov, 
			telId: req.body.idtel 
		}
	});
	res.sendStatus(200);	
}

// Telefono nuevo a cliente
exports.acliente = (req, res) => {
	db.sequelize.query('INSERT INTO clientes_telefonos VALUES (:cliId, :telId)',{
		replacements: {
			cliId: req.body.idcli, 
			telId: req.body.idtel 
		}
	});
	res.sendStatus(200);
}

// Actualiza por id
exports.update = (req, res) => {
	Telefono.update({
        numero: req.body.numero,
        contacto: req.body.contacto,
        nota: req.body.nota
		}, {
			where: {
				id: req.params.id
			}
		})
		.then((count) => {
			console.log('Telefonos actualizados: ' + count);
			res.json(Telefono.findByPk(req.params.id))
		})
}