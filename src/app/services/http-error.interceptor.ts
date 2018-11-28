import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // aca podriamos cambiar los headers del request por ejemplo
    // si trabajamos con tokens

    // request = request.clone({
    //  setHeaders: {
    //    Authorization: `Bearer ` + localStorage.getItem('jwtToken')
    //  }
    // });

    // aca continuamos la ejecucion del HttpHandler
    return next.handle(request).pipe(catchError((error, caught) => {
      // intercepta la respuesta de error y loguea en consola
      // console.log(error);
      this.handleError(error);
      return of(error);
    }) as any);
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    // Error 500 de servidor
    if (err.status === 409) {
      // navigate /delete cookies or whatever
      console.log('Status: ' + err.status);
      // vamos al login por las dudas
      // this.router.navigate(['/login']);
      // o metemos un alert
      // alert('Error: Conflicto de datos revise sucursal y nro factura: ' +  err.name);
      // devolvemos un observable del mensaje error.
      return of(err);
    }
    throw err;
  }
}
