const db = require('../configs/db.config');
const Proveedor = db.proveedor;
const Telefono = db.telefono;

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
		attributes: ['razonsocial', 'cuit', 'condicioniva'],
		include: [{
			model: Telefono,
			as: 'telefonos',
			attributes: [
				['numero', 'nro'], 'contacto', 'nota'
			],
			through: {
				attributes: []
			} // ^ aca es fundamental esto para que no agregue esa jodida join table al resultado
		}]
	}).then(proveedores => {
		res.json(proveedores);
	});
};