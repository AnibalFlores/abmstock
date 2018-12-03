import { Itemventa } from './itemventa';

export class Facturaventa {
    id: number;
    puntoventa: number;
    numero: number;
    tipo: String;
    fecha: String;
    total: number;
    iva21: number;
    iva10: number;
    subtotaliva: number;
    items: Itemventa[];
    clienteId: number;
}
