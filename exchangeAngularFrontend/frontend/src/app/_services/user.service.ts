import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';

const API_URL = 'https://qa.samparkme.com/samparkdesk/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'body',
};

const httpOptionsUpload = {
  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
  observe: 'response' as 'body',
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserDetails(id: any): Observable<any> {
    return this.http.get(
      API_URL + 'get-level1-users-details?id=' + id,
      httpOptions
    );
  }
  getUserList(): Observable<any> {
    return this.http.get(API_URL + 'get-level1-users', httpOptions);
  }
  addUserDetails(userdetails: any): Observable<any> {
    return this.http.post(
      API_URL + 'create-level1-user',
      userdetails,
      httpOptions
    );
  }

  accountFileUpload(accountDetail: any): Observable<any> {
    return this.http.post(API_URL + 'upload-account-files', accountDetail);
  }

  getIFSCCodeInfo(IFSC: string): Observable<any> {
    return this.http.get('https://ifsc.razorpay.com/' + IFSC);
  }

  commonImageUpload(Url: string, body: any): Observable<any> {
    return this.http.post(API_URL + Url, body);
  }

  commonPostAPI(Url: string, body: any): Observable<any> {
    return this.http.post(API_URL + Url, body, httpOptions);
  }

  commonGetAPI(Url: string): Observable<any> {
    return this.http.get(API_URL + Url, httpOptions);
  }
  commonPostDataAPI(Url: string, body: any): Observable<any> {
    const httpOptions = {
      observe: 'response' as 'body',
    };

    return this.http.post(API_URL + Url, body, httpOptions);
  }
  commonUpdateDataAPI(Url: string, body: any): Observable<any> {
    const httpOptions = {
      observe: 'response' as 'body',
    };

    return this.http.patch(API_URL + Url, body, httpOptions);
  }
}
