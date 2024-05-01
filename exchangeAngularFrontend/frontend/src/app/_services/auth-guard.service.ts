import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | Observable<boolean> | Promise<boolean> {
    if (state.url.includes('verify') && !this.authService.VerifyStatus) {
      this.router.navigate(['signin']);
    }
    else {
      if (!state.url.includes('verify') && !this.authService.LoginStatus) {
        this.router.navigate(['signin']);
      }
    }
    return state.url.includes('verify')?this.authService.VerifyStatus: this.authService.LoginStatus;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(route, state);
  }
}
