// https://www.uno-de-piera.com/consumir-api-rest-con-httpclient-angular-5/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Usuario } from '../classes/usuario';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = new Usuario();
  private logueado = new BehaviorSubject(this.user);
  quien = this.logueado.asObservable();
  url: String = 'api/usuarios';

  constructor(private client: HttpClient) {

  }

  nuevoLogueado(u: Usuario) {
    this.user = u;
    this.logueado.next(this.user);

  }

  isAdmin() { return this.user.rol === 'A'; }

  isCompra() { return this.user.rol === 'C'; }

  isVenta() { return this.user.rol === 'V'; }

  isLogged() {
    if (this.user === undefined) { return false; }
    return this.user.rol !== 'N'; }

  // Observable devuelve usuario no olvidar hacer la suscripcion
  login(usuario: String, clave: String) {
    const body = { usuario: usuario, clave: clave };
    return this.client.post('http://localhost:3000/api/login', body, httpOptions);
  }

  logout() {
    this.user.rol = 'N';
  }

}
