import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class VentasGuard implements CanActivate {

  constructor(private router: Router, private authSrv: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authSrv.isVenta() || this.authSrv.isAdmin()) { return true; }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;

  }

}
