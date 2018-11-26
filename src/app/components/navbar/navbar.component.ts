import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuario: Usuario;
  admin = false;
  compras = false;
  ventas = false;

  constructor(
    private authSrv: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.usuario = this.authSrv.logueado;
    this.admin = this.authSrv.logueado.rol === 'A';
    this.compras = this.authSrv.logueado.rol === 'C';
    this.ventas = this.authSrv.logueado.rol === 'V';
  }

  salir() {
    this.authSrv.logout();
    this.router.navigate(['/']);
  }
}
