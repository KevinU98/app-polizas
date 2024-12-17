import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { auth } from '@Global/endpoints';
import { LoginRequest, LoginResponse } from '@Models/Auth';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  auth(login:LoginRequest): Observable<LoginResponse> {
    const httpOptions = {headers:this.headers}
    return this.http.post<LoginResponse>(auth.login, login, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
