const db = require('../configs/db.config');
const Proveedor = db.proveedor;
const Telefono = db.telefono;
const Facturacompra = db.facturacompra;
const Itemcompra = db.itemcompra;


// Iniciar datos: Proveedores & Telefonos
exports.init = (req, res) => {

	Proveedor.create({
		razonsocial: 'Airoldi Computers',
		cuit: '30-15464967-8',
		condicioniva: 'Responsable Inscripto'
	}).then(p => {
		Telefono.create({
				numero: '341-4372519',
				contacto: 'Jorge Casas',
				nota: 'Respresentate ventas asignado nuestro id #1234'
			})
			.then(tel =>
				p.addTelefono(tel))
	});

	Proveedor.create({
		razonsocial: 'XTR Notebooks',
		cuit: '31-32466712-7',
		condicioniva: 'Responsable Inscripto'
	}).then(p => {
		Telefono.create({
				numero: '011-43322445',
				contacto: 'Uriel Schazwardeen',
				nota: 'Respresentate ventas asignado nuestro id #4573'
			})
			.then(tel =>
				p.addTelefono(tel))
	});

	// return res.send('Proovedores Ok');

};


// Listar todos los Proveedores con sus telefonos
exports.findAll = (req, res) => {
	Proveedor.findAll({
		attributes: ['id', 'razonsocial', 'cuit', 'condicioniva'],
		include: [{
			model: Telefono,
			as: 'telefonos',
			attributes: ['id', 'numero', 'contacto', 'nota'],
			through: {
				attributes: []
			} // ^ aca es fundamental esto para que no agregue esa jodida join table al resultado
		}]
	}).then(proveedores => {
		res.json(proveedores);
	});
};

exports.findById = (req, res) => {
	Proveedor.findByPk(req.params.id, {
		attributes: ['id', 'razonsocial', 'cuit', 'condicioniva'],
		include: [{
			model: Telefono,
			as: 'telefonos',
			attributes: ['id', 'numero', 'contacto', 'nota'],
			through: {
				attributes: []
			} // ^ aca es fundamental esto para que no agregue esa jodida join table al resultado
		}]
	}).then(pro => res.json(pro))
};

exports.destroy = (req, res) => {
	Proveedor.destroy({
		where: {
			id: req.params.id
		}
	}).then(response => res.json(response))
}

exports.create = (req, res) => {
	Proveedor.create({
		razonsocial: req.body.razonsocial,
		cuit: req.body.cuit,
		condicioniva: req.body.condicioniva
	}).then(pro => {
		pro.addTelefono(req.body.telefonos)
		res.json(pro)
		console.log(pro.get())
	})

}

exports.update = (req, res) => {
	Proveedor.update({
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
			console.log('Proveedores actualizados: ' + count);
			res.json(Proveedor.findByPk(req.params.id))
		})

}

// https://www.codementor.io/mirko0/how-to-use-sequelize-with-node-and-express-i24l67cuz

exports.nuevafactura = (req, res) => {
	const body = req.body;

	const items = body.facturas[0].items.map(item => Itemcompra.findOrCreate({
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

	Proveedor.findByPk(body.id)
		.then(() => Facturacompra.create({
			fecha: req.body.facturas[0].fecha,
			puntoventa: req.body.facturas[0].puntoventa,
			numero: req.body.facturas[0].numero,
			tipo: req.body.facturas[0].tipo.trim(),
			proveedorId: req.body.id
		}))
		.then(factura => Promise.all(items).then(storedItems => factura.addItems(storedItems)).then(() => factura))
		.then(factura => Facturacompra.findOne({
			where: {
				id: factura.id
			}
		}))
		.then(facturacompleta => res.status(201).json(facturacompleta), error => res.status(400).json(error));
}
/* ESTO NO ME ANDA BIEN EN TODOS LOS CASOS commitea antes de terminar
 la transaccion 
exports.nuevafactura = (req, res) => {
	const items = req.body.facturas[0].items;
	// console.log(items.length);

	let bulks = [];
	db.sequelize.transaction(function (t) {
		for (let i = 0; i < items.length; i++) {
			Itemcompra.create({
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
		return Facturacompra.create({
			fecha: req.body.facturas[0].fecha,
			puntoventa: req.body.facturas[0].sucursal,
			numero: req.body.facturas[0].numero,
			tipo: req.body.facturas[0].tipo,
			proveedorId: req.body.id
		}, {
			transaction: t
		}).then(function (fac) {
			// asociamos los items a la factura (los triggers actualizan las cantidades de articulos)
			fac.addItem(bulks, {
				transaction: t
			});
			// devolvemos la factura generada
			return res.json(fac.get());

		}).catch(err => res.send(err));
		}
	)
}
*/

// Listar todos las Facturas de Compras (sin items)
exports.findAllfacturas = (req, res) => {
	Facturacompra.findAll({
		attributes: ['id', 'fecha', 'puntoventa', 'numero', 'tipo', 'proveedorId']
	}).then(facturas => {
		res.json(facturas);
	});
};

exports.findfacturaById = (req, res) => {
	Facturacompra.findByPk(req.params.id, {
		attributes: ['id', 'fecha', 'puntoventa', 'numero', 'tipo', 'proveedorId'],
		include: [{
			model: Itemcompra,
			as: 'items',
			attributes: ['id', 'idarticulo', 'renglon', 'cantidad', 'codigoproducto', 'descripcion', 'preciounitario', 'iva', 'subtotal']
		}]
	}).then(factura => {
		res.json(factura);
	});
};

exports.findultimafactura = (req, res) => {
	Facturacompra.findAll({
		limit: 1,
		order: [
			['createdAt', 'DESC']
		]
	}).then(function (factura) {
		res.json(factura);
	});
};