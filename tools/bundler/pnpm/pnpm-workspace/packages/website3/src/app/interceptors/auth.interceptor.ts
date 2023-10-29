import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private $jwt: JwtService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const isAuthenticated = this.$jwt.isAuthenticated();

    const token = localStorage.getItem('access_token');
    if (isAuthenticated && token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });

      // send cloned request with header to the next handler.
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}