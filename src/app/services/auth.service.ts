// https://www.uno-de-piera.com/consumir-api-rest-con-httpclient-angular-5/
import { Injectable } from '@angular/core';
import { Usuario } from '../classes/usuario';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  logueado: Usuario;
  url: String = 'api/usuarios';
  rol;

  constructor(private client: HttpClient) {

  }

  isAdmin() { return this.logueado.rol === 'A'; }

  isCompra() { return this.logueado.rol === 'C'; }

  isVenta() { return this.logueado.rol === 'V'; }

  isLogged() {
    if (this.logueado === undefined) { return false; }
    return this.logueado.rol !== 'N'; }

  // observable devuelve usuario no olvidar hacer la suscripcion
  login(usuario: String, clave: String) {
    const body = { usuario: usuario, clave: clave };
    return this.client.post('http://localhost:3000/api/login', body, httpOptions);
  }

  logout() {
    this.logueado.rol = 'N';
  }

}
