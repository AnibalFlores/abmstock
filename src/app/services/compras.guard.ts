import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ComprasGuard implements CanActivate {

  constructor(private router: Router, private authSrv: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.authSrv.isCompra || this.authSrv.isAdmin) { return true; }

    // resguardamos la direccion pedida
    this.authSrv.redirectUrl = state.url;
    // console.log(state.url);
    // vamos al login
    // this.router.navigate(['/']);
    return false;

  }
}
