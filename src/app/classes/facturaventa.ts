import { Itemventa } from './itemventa';

export class Facturaventa {
    sucursal: number;
    numero: number;
    tipo: String;
    fecha: String;
    total: number;
    iva21: number;
    iva10: number;
    subtotaliva: number;
    items: Itemventa[];
}
