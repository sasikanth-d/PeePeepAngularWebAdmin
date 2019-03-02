import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()

export class Authinterceptor implements HttpInterceptor {

  constructor(private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone()).pipe(catchError(err => {
        sessionStorage.setItem('user_token', '');
        if (err.status === 400) {
        }
        const error = err.error.error_description || err.statusText;
        return throwError(error);
      }), tap(
        (data: any) => {
          if (data instanceof HttpResponse) {
            if (data.body.access_token !== '' && data.body.token_type === 'bearer' && data.status === 200
              && data.statusText.toLowerCase() === 'ok') {
              if (data && data.body.access_token) {
                sessionStorage.setItem('user_token', data.body.access_token);
              }
            } else
              if (data.status !== 200) {
                this.router.navigateByUrl('/login');
              }
          }
        }
      ));
    } else {
      if (sessionStorage.getItem('user_token') !== null) {
        const clonedReq = req.clone({
          headers: req.headers.set('Authorization', 'Barer' + sessionStorage.getItem('user_token'))
        });
        return next.handle(clonedReq)
          .pipe(
            catchError(err => {
              const error = err.error.error_description || err.statusText;
              return throwError(error);
              if (error.status === 401) {
                this.router.navigateByUrl('/login');
              }
            }
            ));
      }

    }

  }

}
