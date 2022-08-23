import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experiencia } from '../modelo/experiencia';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaServiceService {



  private url: string = 'https://ap--carolina-perez-backend.herokuapp.com/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }


  /** GET: Listado de experiencia*/
  listarExperiencias(): Observable<Experiencia[]> {
    return this.http.get<Experiencia[]>(this.url + 'portfolio/experiencia').pipe(
      catchError(this.handleError<Experiencia[]>('listarExperiencias', []))
    );
  }

  /** POST: Guardo una experiencia"*/
  guaradarExperiencia(experiencia: Experiencia): Observable<Experiencia> {
    return this.http.post<Experiencia>(this.url + 'editarPortfolio/experiencia/agregar', experiencia, this.httpOptions).pipe(
      catchError(this.handleError<Experiencia>('guaradarExperiencia'))
    );
  }


  eliminaExperiencia(experiencia: Experiencia) {
    const url = `${this.url + "editarPortfolio/experiencia/eliminar"}/${experiencia.id}`;
    return this.http.delete<Boolean>(url, this.httpOptions).pipe(
      catchError(this.handleError<Boolean>('guaradarExperiencia', false))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} Fallo: ${error.message}`);
      return of(result as T);
    };


  }
}
