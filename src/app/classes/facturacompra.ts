import { Itemcompra } from './itemcompra';

export class Facturacompra {
    id: number;
    puntoventa: number;
    numero: number;
    tipo: String;
    fecha: String;
    total: number;
    iva21: number;
    iva10: number;
    subtotaliva: number;
    items: Itemcompra[];
    proveedorId: number;
}
