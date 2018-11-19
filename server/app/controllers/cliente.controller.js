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
exports.findAll = (req, res) => {
    Cliente.findAll({
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
    }).then(clientes => {
        res.json(clientes);
    });
};