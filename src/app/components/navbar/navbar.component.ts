import { Component, OnInit, Input } from '@angular/core';
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

  constructor(
    public authSrv: AuthService,
    private router: Router) {
  }

  ngOnInit() {
    this.authSrv.quien.subscribe((user: Usuario) => this.usuario = user);

  }

  salir() {
    this.authSrv.logout();
    this.usuario = null;
    this.router.navigate(['/']);
  }
}
