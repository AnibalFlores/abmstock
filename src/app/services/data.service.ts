import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Articulo } from '../classes/articulo';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};
const baseUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpCli: HttpClient) { }

getArticulos() {
 return this.httpCli.get(baseUrl + '/api/articulos', httpOptions);
}

getArticulo(id: number) {
  return this.httpCli.get(baseUrl + '/api/articulo/' + id, httpOptions);
}

putArticulo(art: Articulo) {
  return this.httpCli.put(baseUrl + '/api/articuloupdate/' + art.id, art, httpOptions);
}

getRubros() {
  return this.httpCli.get(baseUrl + '/api/rubros', httpOptions);
}


}
