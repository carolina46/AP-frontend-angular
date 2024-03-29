import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Habilidad } from '../modelo/habilidad';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  private url: string = 'https://ap--carolina-perez-backend.herokuapp.com/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }


  /** GET: Listado de habilidades*/
  listarHabilidades(): Observable<Habilidad[]> {
    return this.http.get<Habilidad[]>(this.url + 'portfolio/habilidad').pipe(
      catchError(this.handleError<Habilidad[]>('listarHabilidades', []))
    );
  }

  /** POST: Guardo una Habilidad"*/
  guaradarHabilidad(habilidad: Habilidad): Observable<Habilidad> {
    return this.http.post<Habilidad>(this.url + 'editarPortfolio/habilidad/agregar', habilidad, this.httpOptions).pipe(
      catchError(this.handleError<Habilidad>('guaradarHabilidad'))
    );
  }

  /** DELETE: Elimino una Habilidad"*/
  eliminaHabilidad(habilidad: Habilidad) {
    const url = `${this.url + "editarPortfolio/habilidad/eliminar"}/${habilidad.id}`;
    return this.http.delete<Boolean>(url, this.httpOptions).pipe(
      catchError(this.handleError<Boolean>('guaradarHabilidad', false))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} Fallo: ${error.message}`);
      return of(result as T);
    };


  }
}
