const db = require('../configs/db.config.js');
const Cliente = db.cliente;
const Telefono = db.telefono;
const Facturaventa = db.facturaventa;
const Itemventa = db.itemventa;

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
// Con Promise.all()
exports.nuevafactura = (req, res) => {
	const body = req.body;

	const items = body.facturas[0].items.map(item => Itemventa.findOrCreate({
			where: {
				id: item.id
			},
			defaults: {
				idarticulo: item.idarticulo,
				renglon: item.renglon,
				cantidad: item.cantidad,
				codigoproducto: item.codigoproducto,
				descripcion: item.descripcion,
				preciounitario: item.preciounitario,
				iva: item.iva,
				subtotal: item.subtotal
			}
		})
		.spread((item, created) => item));

	Cliente.findByPk(body.id)
		.then(() => Facturaventa.create({
			fecha: req.body.facturas[0].fecha,
			puntoventa: req.body.facturas[0].puntoventa,
			numero: req.body.facturas[0].numero,
			tipo: req.body.facturas[0].tipo.trim(),
			clienteId: req.body.id
		}))
		.then(factura => Promise.all(items).then(storedItems => factura.addItems(storedItems)).then(() => factura))
		.then(factura => Facturaventa.findOne({
			where: {
				id: factura.id
			}
		}))
		.then(facturacompleta => res.status(201).json(facturacompleta), error => res.status(400).json(error));

}
/* 
 CON UNA TRANSACCION NO FUNCIONABA SIEMPRE
exports.nuevafactura = (req, res) => {
	const items = req.body.facturas[0].items;
	// console.log(items.length);

	let bulks = [];
	db.sequelize.transaction(function (t) {
		for (let i = 0; i < items.length; i++) {
			Itemventa.create({
				idarticulo: items[i].idarticulo,
				renglon: items[i].renglon,
				cantidad: items[i].cantidad,
				codigoproducto: items[i].codigoproducto,
				descripcion: items[i].descripcion,
				preciounitario: items[i].preciounitario,
				iva: items[i].iva,
				subtotal: items[i].subtotal
			}, {
				transaction: t
			}).then(i => {
				// guardamos los id de los items
				bulks.push(i.id);

			})
		}
		// console.log(bulks);
		return Facturaventa.create({
			fecha: req.body.facturas[0].fecha,
			puntoventa: req.body.facturas[0].puntoventa,
			numero: req.body.facturas[0].numero,
			tipo: req.body.facturas[0].tipo,
			clienteId: req.body.id
		}, {
			transaction: t
		}).then(function (fac) {
			// asociamos los items a la factura (los triggers actualizan las cantidades de articulos)
			fac.addItem(bulks, {
				transaction: t
			});
			// devolvemos la factura generada
			return res.json(fac.get());

		}).catch(err => res.status(409).send(err));
	})
}*/

// Listar todos las Facturas de Ventas (sin items)
exports.findAllfacturas = (req, res) => {
	Facturaventa.findAll({
		attributes: ['id', 'fecha', 'puntoventa', 'numero', 'tipo', 'clienteId']
	}).then(facturas => {
		res.json(facturas);
	});
};

exports.findfacturaById = (req, res) => {
	Facturaventa.findByPk(req.params.id, {
		attributes: ['id', 'fecha', 'puntoventa', 'numero', 'tipo', 'clienteId'],
		include: [{
			model: Itemventa,
			as: 'items',
			attributes: ['id', 'idarticulo', 'renglon', 'cantidad', 'codigoproducto', 'descripcion', 'preciounitario', 'iva', 'subtotal']
		}]
	}).then(factura => {
		res.json(factura);
	});
};

exports.findultimafactura = (req, res) => {
	Facturaventa.findAll({
		limit: 1,
		order: [
			['createdAt', 'DESC']
		]
	}).then(function (factura) {
		res.json(factura);
	});
};