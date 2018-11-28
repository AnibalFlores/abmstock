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