import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  usuario: Usuario;
  este = new Subscription();

  constructor(
    public authSrv: AuthService,
    private router: Router
    ) {
      // Nos suscribimos al authorization service para ver quien esta logueado... quien es este?
      this.este = this.authSrv.quien.subscribe((user: Usuario) => this.usuario = user);

  }

  ngOnInit() {
    // si desaparece la nav-bar porque me apreta F5 va al login
    if (this.usuario.rol === 'N') {
      this.router.navigate(['/']);
    }
  }

  salir() {
    this.authSrv.logout();
    this.usuario = new Usuario();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.este.unsubscribe;
  }

}
