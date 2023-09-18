import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Locker, DRIVERS } from 'angular-safeguard';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private locker: Locker) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.getSession()) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  getSession() {
    return this.locker.get(DRIVERS.SESSION, 'currentSession');
  }

  setSession(token: string) {
    this.locker.set(DRIVERS.SESSION, 'currentSession', token);
  }

  logout() {
    this.locker.clear(DRIVERS.SESSION)
  }
}