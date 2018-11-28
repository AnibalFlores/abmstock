import { Rubro } from './rubro';

export class Articulo {
    id: number;
    codigo: String;
    nombre: String;
    descripcion: String;
    preciocompra: number;
    precioventa: number;
    cantidad: number;
    rubro: Rubro;
}
