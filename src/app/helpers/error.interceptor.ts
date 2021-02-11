import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { AuthService } from 'app/services/auth.service';
import { User } from 'app/models/user';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      let error: any;
      if (err.status === 401) {
        // auto logout if 401 response returned from api and no refresh or access token
        this.refreshToken();
      } else if (err.status === 400 || err.status == 404) {
        error = err.error;
      } else if (err.status === 429 && err.error.detail) {
        error = err.error.detail;
      } else {
        error = err.error.message || err.statusText;
      }

      return throwError(error);
    }));
  }
  refreshToken() {
    // this._auth.refreshToken().pipe(first()).subscribe(
    //   (res: any) => {
    //     if (res && res.access) {
    //       let user: User = JSON.parse(localStorage.getItem('user'));
    //       localStorage.setItem('user', JSON.stringify(user));
    //     }
    //   },
    //   err => {
    //     this._auth.logout();
    //   }
    // )
  }
}
