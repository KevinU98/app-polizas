import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { polizas, beneficiarios } from '@EndPoints';
import { BeneficiarioRequest, GetBeneficiarioRequest, GetConsecutivoResponse, GetPolizasResponse, PolizaRequest } from '@Models/Polizas';

@Injectable({
  providedIn: 'root',
})
export class PolizaService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders ({})
  }

  getFolio(): Observable<GetConsecutivoResponse> {
    const httpOptions = { headers: this.headers };
    return this.http.get<GetConsecutivoResponse>(polizas.getFolio, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
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

  insertPoliza(request:PolizaRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers };
    return this.http.post<boolean>(polizas.insert,request,httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  getAllBeneficiarios(request:GetBeneficiarioRequest): Observable<GetPolizasResponse> {
    const params = new HttpParams({
      fromObject:{
        consecutivo: request.consecutivo
      }
    })
    const httpOptions = {headers:this.headers, params}
    return this.http.get<GetPolizasResponse>(beneficiarios.get, httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }

  insertBeneficiario(request:BeneficiarioRequest): Observable<boolean> {
    const httpOptions = { headers: this.headers };
    return this.http.post<boolean>(beneficiarios.insert,request,httpOptions)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}