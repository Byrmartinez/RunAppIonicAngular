import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }
  apiUrlLogin = 'http://localhost:3000/usuarios/login'
  apiUrlUsuarios = 'http://localhost:3000/usuarios';
  apiUrlEnvios = 'http://localhost:3000/envios';
  constructor(private http: HttpClient) {

  }
  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrlUsuarios).pipe(
      retry(3));
  }
  getUsuarioById(id: string): Observable<any> {
    return this.http.get(this.apiUrlUsuarios + id).pipe(
      retry(3)
    );
  }
  updateUsuarios(body: any): Observable<any> {
    return this.http.put(this.apiUrlUsuarios, body)
      .pipe(retry(3));
  }
  CreateUsuario(body: any): Observable<any> {
    return this.http.put(this.apiUrlUsuarios, body)
      .pipe(retry(3));
  }
  DeleteUsuario(id: string): Observable<any> {
    return this.http.delete(this.apiUrlUsuarios + '/' + id)
      .pipe(retry(3));
  }
  // Método para el login
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(this.apiUrlLogin, body)
      .pipe(retry(3));
  }
  getEnvios(): Observable<any> {
    return this.http.get(this.apiUrlEnvios).pipe(
      retry(3));
  }
  getEnvioById(id: string): Observable<any> {
    return this.http.get(this.apiUrlEnvios + "?id=" + id).pipe(
      retry(3)
    );
  }
  updateEnvios(body: any): Observable<any> {
    return this.http.put(this.apiUrlEnvios, body)
      .pipe(retry(3));
  }
  CreateEnvio(body: any): Observable<any> {
    return this.http.put(this.apiUrlEnvios, body)
      .pipe(retry(3));
  }
  DeleteEnvio(id: string): Observable<any> {
    return this.http.delete(this.apiUrlEnvios + '/' + id)
      .pipe(retry(3));
  }


}