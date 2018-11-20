import { Telefono } from './telefono';

export class Proveedor {
    id: number;
    razonsocial: String;
    cuit: String;
    condicioniva: String;
    telefonos: [Telefono];
}
