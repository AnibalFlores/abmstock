import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Articulo } from '../classes/articulo';
import { Rubro } from '../classes/rubro';
import { Proveedor } from '../classes/proveedor';
import { Telefono } from '../classes/telefono';
import { Cliente } from '../classes/cliente';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private httpCli: HttpClient) { }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  // Verbos para Articulos
  getArticulos() {
    return this.httpCli.get(baseUrl + '/api/articulos', httpOptions);
  }

  getStock() {
    return this.httpCli.get(baseUrl + '/api/stock', httpOptions);
  }

  getArticulo(id: number): Observable<any> {
    return this.httpCli.get(baseUrl + '/api/articulo/' + id, httpOptions).pipe(
      map(this.extractData));
  }

  putArticulo(art: Articulo) {
    return this.httpCli.put<Articulo>(baseUrl + '/api/articuloupdate/' + art.id, JSON.stringify(art), httpOptions);
  }

  newArticulo(art: Articulo) {
    return this.httpCli.post<Articulo>(baseUrl + '/api/articulonuevo/', JSON.stringify(art), httpOptions);
  }

  delArticulo(id: number) {
    return this.httpCli.delete(baseUrl + '/api/articuloborrar/' + id, httpOptions);
  }

  // Verbos para Rubros
  getRubros() {
    return this.httpCli.get(baseUrl + '/api/rubros', httpOptions);
  }

  getRubro(id: number): Observable<any> {
    return this.httpCli.get(baseUrl + '/api/rubro/' + id, httpOptions).pipe(
      map(this.extractData));
  }

  putRubro(rub: Rubro) {
    return this.httpCli.put<Rubro>(baseUrl + '/api/rubroupdate/' + rub.id, JSON.stringify(rub), httpOptions);
  }

  newRubro(rub: Rubro) {
    return this.httpCli.post<Rubro>(baseUrl + '/api/rubronuevo/', JSON.stringify(rub), httpOptions);
  }

  delRubro(id: number) {
    return this.httpCli.delete(baseUrl + '/api/rubroborrar/' + id, httpOptions);
  }

  // Verbos para Proveedores
  getProveedores() {
    return this.httpCli.get(baseUrl + '/api/proveedores', httpOptions);
  }

  getProveedor(id: number): Observable<any> {
    return this.httpCli.get(baseUrl + '/api/proveedor/' + id, httpOptions).pipe(
      map(this.extractData));
  }

  putProveedor(pro: Proveedor) {
    return this.httpCli.put<Proveedor>(baseUrl + '/api/proveedorupdate/' + pro.id, JSON.stringify(pro), httpOptions);
  }

  newProveedor(pro: Proveedor) {
    return this.httpCli.post<Proveedor>(baseUrl + '/api/proveedornuevo/', JSON.stringify(pro), httpOptions);
  }

  delProveedor(id: number) {
    return this.httpCli.delete(baseUrl + '/api/proveedorborrar/' + id, httpOptions);
  }

  // Verbos para Clientes
  getClientes() {
    return this.httpCli.get(baseUrl + '/api/clientes', httpOptions);
  }

  getCliente(id: number): Observable<any> {
    return this.httpCli.get(baseUrl + '/api/cliente/' + id, httpOptions).pipe(
      map(this.extractData));
  }

  putCliente(cli: Cliente) {
    return this.httpCli.put<Cliente>(baseUrl + '/api/clienteupdate/' + cli.id, JSON.stringify(cli), httpOptions);
  }

  newCliente(cli: Cliente) {
    return this.httpCli.post<Cliente>(baseUrl + '/api/clientenuevo/', JSON.stringify(cli), httpOptions);
  }

  delCliente(id: number) {
    return this.httpCli.delete(baseUrl + '/api/clienteborrar/' + id, httpOptions);
  }

  // Verbos para Telefonos
  getTelefono(id: number): Observable<any> {
    return this.httpCli.get(baseUrl + '/api/telefono/' + id, httpOptions).pipe(
      map(this.extractData));
  }

  putTelefono(tel: Telefono) {
    return this.httpCli.put<Telefono>(baseUrl + '/api/telefonoupdate/' + tel.id, JSON.stringify(tel), httpOptions);

  }

  newTelefono(tel: Telefono) {
    return this.httpCli.post<Telefono>(baseUrl + '/api/telefononuevo/', JSON.stringify(tel), httpOptions);
  }

  delTelefono(id: number) {
    return this.httpCli.delete(baseUrl + '/api/telefonoborrar/' + id, httpOptions);
  }

  asociarTelefonoProveedor(idTel, idProv) {
    const body = { idtel: idTel, idprov: idProv };
    return this.httpCli.post(baseUrl + '/api/telefonoproveedor/', JSON.stringify(body), httpOptions);
  }

  asociarTelefonoCliente(idTel, idCli) {
    const body = { idtel: idTel, idcli: idCli };
    return this.httpCli.post(baseUrl + '/api/telefonocliente/', JSON.stringify(body), httpOptions);
  }

  // Verbos para facturas

  newFacturaCliente(cli: Cliente) {
    return this.httpCli.post<Cliente>(baseUrl + '/api/clientenuevafactura/', JSON.stringify(cli), httpOptions);
  }

  newFacturaProveedor(pro: Proveedor): Observable<any> {
    return this.httpCli.post<Proveedor>(baseUrl + '/api/proveedornuevafactura/', JSON.stringify(pro), httpOptions);
  }
  // usado
  getUltimaFacturacompra() {
    return this.httpCli.get(baseUrl + '/api/ultimaFacturaCompra', httpOptions).pipe(
      map(this.extractData));
  }

  // no usado
  getUltimaFacturaventa() {
    return this.httpCli.get(baseUrl + '/api/ultimaFacturaVenta', httpOptions).pipe(
      map(this.extractData));
  }

  getFacturasCompras() {
    return this.httpCli.get(baseUrl + '/api/facturascompras/').pipe(
      map(this.extractData));
  }

  getFacturasVentas() {
    return this.httpCli.get(baseUrl + '/api/facturasventas/').pipe(
      map(this.extractData));
  }

  getFacturaProveedor(id: number) {
    return this.httpCli.get(baseUrl + '/api/proveedorfactura/' + id, httpOptions).pipe(
      map(this.extractData));
  }

  getFacturaCliente(id: number) {
    return this.httpCli.get(baseUrl + '/api/clientefactura/' + id, httpOptions).pipe(
      map(this.extractData));
  }

}
