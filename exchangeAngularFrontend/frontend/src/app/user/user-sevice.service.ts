import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const API_URL = 'https://rest.coinapi.io/v1/';
const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json',
    'X-CoinAPI-Key': 'FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserSeviceService {
  constructor(private http: HttpClient) {}
  commonGetAPI(Url: string): Observable<any> {
    return this.http.get(API_URL + Url, httpOptions);
  }
}
