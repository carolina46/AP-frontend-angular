import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { AcercaDe } from '../modelo/acerca-de';


@Injectable({
  providedIn: 'root'
})


export class AcercaDeService {

  private url : string = 'https://ap--carolina-perez-backend.herokuapp.com/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  constructor(private http: HttpClient) { }

  /** GET: Obtengo la informacion de "Acerca de"*/
  obtenerDatosAcercaDe(): Observable<AcercaDe>{
    return this.http.get<AcercaDe>(this.url + 'portfolio/acercaDe').pipe(
      catchError(this.handleError<AcercaDe>('obtenerDatosAcercaDe'))
    );
}

/** POST: Guardo datos de "Acerca de"*/
 guaradarAcercaDe (acercaDe: AcercaDe): Observable<Boolean> {
  return this.http.post<Boolean>(this.url + 'editarPortfolio/acercaDe/guardar', acercaDe, this.httpOptions).pipe(
    catchError(this.handleError<Boolean>('guaradarAcercaDe', false))
  );
}




 private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(`${operation} Fallo: ${error.message}`); 
    return of(result as T);
  };
}












}
