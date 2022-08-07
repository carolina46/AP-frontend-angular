import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Educacion } from '../modelo/educacion';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {

  private url: string = 'http://localhost:8080/educacion/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }


  /** GET: Listado de educacion*/
  listarEducacions(): Observable<Educacion[]> {
    return this.http.get<Educacion[]>(this.url + 'listar').pipe(
      catchError(this.handleError<Educacion[]>('listarEducacions', []))
    );
  }

  /** POST: Guardo una educacion"*/
  guaradarEducacion(experiencia: Educacion): Observable<Educacion> {
    return this.http.post<Educacion>(this.url + 'agregar', experiencia, this.httpOptions).pipe(
      catchError(this.handleError<Educacion>('guaradarEducacion'))
    );
  }

  /** DELETE: elimino una educacion"*/
  eliminaEducacion(experiencia: Educacion) {
    const url = `${this.url + "eliminar"}/${experiencia.id}`;
    return this.http.delete<Boolean>(url, this.httpOptions).pipe(
      catchError(this.handleError<Boolean>('guaradarEducacion', false))
    );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} Fallo: ${error.message}`);
      return of(result as T);
    };


  }
}
