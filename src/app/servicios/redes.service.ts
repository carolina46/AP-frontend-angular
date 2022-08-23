import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { RedesSociales } from '../modelo/redesSociales';

@Injectable({
  providedIn: 'root'
})
export class RedesService {

  private url: string = 'https://ap--carolina-perez-backend.herokuapp.com/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /** GET: Obtengo la informacion de las redes sociales"*/
  obtenerDatosResdesSociales(): Observable<RedesSociales> {
    return this.http.get<RedesSociales>(this.url + 'portfolio/redesSociales').pipe(
      catchError(this.handleError<RedesSociales>('obtenerDatosRedesSociales'))
    );
  }

  /** POST: Guardo datos de RedesSociales*/
  guaradarRedesSociales(redesSociales: RedesSociales): Observable<RedesSociales> {
    return this.http.post<RedesSociales>(this.url + 'editarPortfolio/redesSociales/guardar', redesSociales, this.httpOptions).pipe(
      catchError(this.handleError<RedesSociales>('guaradarRedesSociales'))
    );
  }




  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} Fallo: ${error.message}`);
      return of(result as T);
    };
  }
}

