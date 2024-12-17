import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { polizas } from '@EndPoints';
import { GetPolizasResponse, PolizaRequest } from '@Models/Polizas';

@Injectable({
  providedIn: 'root',
})
export class PolizaService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  getAllPolizas(): Observable<GetPolizasResponse> {
    const httpOptions = { headers: this.headers };
    return this.http.get<GetPolizasResponse>(polizas.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  insertPoliza(estatus:PolizaRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers };
    return this.http.post<boolean>(polizas.insert,estatus,httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}