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
  apiUrlDatosRider = 'http://localhost:3000/datos_riders';
  apiUrlDatospyme = 'http://localhost:3000/datos_pymes';
  constructor(private http: HttpClient) {

  }
  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrlUsuarios).pipe(
      retry(3));
  }
  getUsuarioById(id: string): Observable<any> {
    return this.http.get(this.apiUrlUsuarios + "?id=" + id).pipe(
      retry(3)
    );
  }
  getUsuarioByEmail(email: string): Observable<any> {
    return this.http.get(this.apiUrlUsuarios + "?email=" + email).pipe(
      retry(3)
    );
  }
  updateUsuarios(body: any): Observable<any> {
    return this.http.put(this.apiUrlUsuarios, body)
      .pipe(retry(3));
  }
  createUsuario(body: any): Observable<any> {
    return this.http.post(this.apiUrlUsuarios, body)
      .pipe(retry(3));
  }
  deleteUsuario(id: string): Observable<any> {
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
  createEnvio(body: any): Observable<any> {
    return this.http.post(this.apiUrlEnvios, body)
      .pipe(retry(3));
  }
  deleteEnvio(id: string): Observable<any> {
    return this.http.delete(this.apiUrlEnvios + '/' + id)
      .pipe(retry(3));
  }
  getDatosRiders(): Observable<any> {
    return this.http.get(this.apiUrlDatosRider).pipe(
      retry(3));
  }
  getDatosRidersById(id: string): Observable<any> {
    return this.http.get(this.apiUrlDatosRider + "?id=" + id).pipe(
      retry(3)
    );
  }
  updateDatosRider(body: any): Observable<any> {
    return this.http.put(this.apiUrlDatosRider, body)
      .pipe(retry(3));
  }
  createDatosRider(body: any): Observable<any> {
    return this.http.post(this.apiUrlDatosRider, body)
      .pipe(retry(3));
  }
  deleteDatosRider(id: string): Observable<any> {
    return this.http.delete(this.apiUrlDatosRider + '/' + id)
      .pipe(retry(3));
  }
  getDatosPymes(): Observable<any> {
    return this.http.get(this.apiUrlDatospyme).pipe(
      retry(3));
  }
  getDatosPymesById(id: string): Observable<any> {
    return this.http.get(this.apiUrlDatospyme + "?id=" + id).pipe(
      retry(3)
    );
  }
  updateDatosPyme(body: any): Observable<any> {
    return this.http.put(this.apiUrlDatospyme, body)
      .pipe(retry(3));
  }
  createDatosPyme(body: any): Observable<any> {
    return this.http.post(this.apiUrlDatospyme, body)
      .pipe(retry(3));
  }
  deleteDatosPyme(id: string): Observable<any> {
    return this.http.delete(this.apiUrlDatospyme + '/' + id)
      .pipe(retry(3));
  }


}