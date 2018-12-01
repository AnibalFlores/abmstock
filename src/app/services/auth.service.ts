// https://www.uno-de-piera.com/consumir-api-rest-con-httpclient-angular-5/
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Usuario } from '../classes/usuario';
import { BehaviorSubject } from 'rxjs';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user = new Usuario();
  redirectUrl: string;
  // en lugar de seguir la guia de angular
  // https://angular.io/guide/router#teach-authguard-to-authenticate
  // fijo el rol N como no logueado en el constructor de la clase usuario
  // y con el BehaviorSubject logueado casteo el usuario con el "quien"
  private logueado = new BehaviorSubject(this.user);
  quien = this.logueado.asObservable();

  constructor(private client: HttpClient) {

  }

  nuevoLogueado(u: Usuario) {
    // recibo el usuario del login
    this.user = u;
    // y lo avisamos a los componentes suscriptos atraves del BehaviorSubject
    this.logueado.next(this.user);

  }

  isAdmin() { return this.user.rol === 'A'; }

  isCompra() { return this.user.rol === 'C'; }

  isVenta() { return this.user.rol === 'V'; }

  isLogged() { return this.user.rol !== 'N'; }

  // Observable devuelve usuario válido (no olvidar hacer la suscripcion desde la login page)
  login(usuario: String, clave: String) {
    const body = { usuario: usuario, clave: clave };
    return this.client.post('http://localhost:3000/api/login', body, httpOptions);
  }

  // re facil creamos un nuevo usuario (rol N) y lo mandamos a nuevologueado
  logout() { this.nuevoLogueado(new Usuario()); }

}
