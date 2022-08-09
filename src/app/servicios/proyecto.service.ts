import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Proyecto } from '../modelo/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  private url: string = 'http://localhost:8080/proyecto/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }


  /** GET: Listado de proyectos*/
  listarProyectos(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(this.url + 'listar').pipe(
      catchError(this.handleError<Proyecto[]>('listarProyectos', []))
    );
  }

  /** POST: Guardo un proyecto"*/
  guaradarProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(this.url + 'agregar', proyecto, this.httpOptions).pipe(
      catchError(this.handleError<Proyecto>('guaradarProyecto'))
    );
  }

  /** DELETE: Elimino un proyecto */
  eliminaProyecto(proyecto: Proyecto) {
    const url = `${this.url + "eliminar"}/${proyecto.id}`;
    return this.http.delete<Boolean>(url, this.httpOptions).pipe(
      catchError(this.handleError<Boolean>('guaradarProyecto', false))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} Fallo: ${error.message}`);
      return of(result as T);
    };


  }
}