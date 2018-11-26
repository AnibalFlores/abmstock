import { Telefono } from './telefono';

export class Cliente {
    id: number;
    razonsocial: String;
    cuit: String;
    condicioniva: String;
    telefonos: [Telefono];
}
