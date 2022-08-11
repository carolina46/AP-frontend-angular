import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { RedesSociales } from '../modelo/redesSociales';

@Injectable({
  providedIn: 'root'
})
export class RedesService {

  private url: string = 'http://localhost:8080/redesSociales/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET: Obtengo la informacion de las redes sociales"*/
  obtenerDatosResdesSociales(): Observable<RedesSociales> {
    return this.http.get<RedesSociales>(this.url + 'obtener').pipe(
      catchError(this.handleError<RedesSociales>('obtenerDatosRedesSociales'))
    );
  }

  /** POST: Guardo datos de RedesSociales*/
  guaradarRedesSociales(redesSociales: RedesSociales): Observable<Boolean> {
    return this.http.post<Boolean>(this.url + 'guardar', redesSociales, this.httpOptions).pipe(
      catchError(this.handleError<Boolean>('guaradarRedesSociales', false))
    );
  }




  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} Fallo: ${error.message}`);
      return of(result as T);
    };
  }
}

