import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

const AUTH_API = 'https://qa.samparkme.com/samparkdesk/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe:"response" as 'body'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || ('false'));
  private VerifyOTPStatus = JSON.parse(localStorage.getItem('VerifyOTP') || ('false'));

  setLoginStatus(value:any) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', this.loggedInStatus);
  }

  setVerifyStatus(value:any) {
    this.VerifyOTPStatus = value;
    localStorage.setItem('VerifyOTP', this.VerifyOTPStatus);
  }

  get VerifyStatus() {
    return JSON.parse(localStorage.getItem('VerifyOTP') || 
    this.VerifyOTPStatus.toString());
  }


  get LoginStatus() {
    return JSON.parse(localStorage.getItem('loggedIn') || 
    this.loggedInStatus.toString());
  }
  login(body: any): Observable<any> {
    return this.http.post(AUTH_API + 'admin/agent/login',body,{observe:"response" as 'body'});
  }
  register(body: any): Observable<any> {
    return this.http.post(AUTH_API + 'admin/agent/register',body ,httpOptions);;
  }
  verify(otp: string): Observable<any> {
    return this.http.post(AUTH_API + 'verify-otp', {
      otp
    }, httpOptions);
  }
  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'logout', httpOptions);
  }

  refreshToken() {
    return this.http.post(AUTH_API + 'refresh-token', {
    }, httpOptions);
  }
}
