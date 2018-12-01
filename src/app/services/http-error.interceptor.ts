// ESTO ESTA DESACTIVADO lo use para capturar las respuestas de error del servidor
// ver en seccion providers del app.modules.ts
// se genera como un service pero con estos imports adicionales
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
    // si trabajamos con tokens jwt seria

    // request = request.clone({
    //  setHeaders: {
    //    Authorization: `Bearer ` + localStorage.getItem('jwtToken')
    //  }
    // });

    // aca continuamos la ejecucion del HttpHandler siempre retornando observable
    return next.handle(request).pipe(catchError((error, caught) => {
      // intercepta la respuesta de error y loguea en consola
      // console.log(error);
      this.handleError(error);
      return of(error);
    }) as any);
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    // Ejemplo con Error 400 del servidor
    if (err.status === 400) {
      // console.log('Status: ' + err.status);
      // podemos ir al login por las dudas con
      // this.router.navigate(['/login']);
      // o metemos un alert
      // alert(
      // 'Error: Esta en conflicto de datos (revise tipo, sucursal y nro):\nMensaje del servidor: '
      //  + JSON.stringify(err.error));
      // devolvemos un observable del mensaje error.
      return of(err);
    }
    // si es otro error distinto a 400 lanzo 400 aunque no me anduvo mejor poner un return of(err) final
    throw err;
  }
}
