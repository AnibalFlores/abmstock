// https://www.uno-de-piera.com/consumir-api-rest-con-httpclient-angular-5/
import { Injectable } from '@angular/core';
import { Usuario } from '../classes/usuario';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  logueado: Usuario;
  url: String = 'api/usuarios';
  rol;

  constructor(private client: HttpClient) {

  }

// observable devuelve usuario no olvidar hacer la suscripcion
login(usuario: String, clave: String) {
    const body = { usuario: usuario, clave: clave };
    return this.client.post('http://localhost:3000/api/login', body, httpOptions);
  }
}
