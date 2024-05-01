import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

const TOKEN_KEY = 'ACCESS-TOKEN';
const REFRESHTOKEN_KEY = 'REFRESH-TOKEN';
const USER_KEY = 'AUTH_USER';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) { }

  signOut() {
    this.authService.setLoginStatus(false);
    this.authService.setVerifyStatus(false);
    this.router.navigate(['/signin']);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public saveUserCredentials(userCredentail: any): void {
    localStorage.setItem('Email', userCredentail.email);
    localStorage.setItem('Password', userCredentail.password);
    localStorage.setItem('RememberMe', userCredentail.rememberme);
  }
  public removeUserCredentials(): void {
    localStorage.removeItem('Email');
    localStorage.removeItem('Password');
    localStorage.removeItem('RememberMe');
  }


}
