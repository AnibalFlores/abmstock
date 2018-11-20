import { Rubro } from './rubro';

export class Articulo {
    id: number;
    codigo: number;
    nombre: String;
    descripcion: String;
    preciocompra: number;
    precioventa: number;
    cantidad: number;
    rubro: Rubro;
}
