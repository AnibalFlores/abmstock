import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Articulo } from '../classes/articulo';
import { Rubro } from '../classes/rubro';
import { Proveedor } from '../classes/proveedor';

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
    return this.httpCli.put<Articulo>(baseUrl + '/api/rubroupdate/' + rub.id, JSON.stringify(rub), httpOptions);
  }

  newRubro(rub: Rubro) {
    return this.httpCli.post<Articulo>(baseUrl + '/api/rubronuevo/', JSON.stringify(rub), httpOptions);
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
    return this.httpCli.put<Articulo>(baseUrl + '/api/proveedorupdate/' + pro.id, JSON.stringify(pro), httpOptions);
  }

  newProveedor(pro: Proveedor) {
    return this.httpCli.post<Articulo>(baseUrl + '/api/proveedornuevo/', JSON.stringify(pro), httpOptions);
  }

  delProveedor(id: number) {
    return this.httpCli.delete(baseUrl + '/api/proveedorborrar/' + id, httpOptions);
  }

  // Verbos para Clientes


}
