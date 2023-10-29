import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private $jwt: JwtService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isAuthenticated = this.$jwt.isAuthenticated();
    if(next.data && next.data.auth === true) {
      if(!isAuthenticated) {
        this.router.navigate(['/']);
        return false;
      }
    } else if(isAuthenticated && next.data && (next.data.name === 'login' || next.data.name === 'signup')) {
      this.router.navigate(['/users']);
      return false;
    }
    return true;
  }
}