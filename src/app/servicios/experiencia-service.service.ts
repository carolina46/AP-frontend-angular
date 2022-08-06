import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../modelo/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaServiceService {



  private url : string = 'http://localhost:8080/experiencia/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }


  /** GET: Listado de experiencia*/
  listarExperiencias(): Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(this.url + 'listar');

  }

/** POST: Guardo una experiencia"*/
 guaradarExperiencia (experiencia: Experiencia): Observable<Experiencia> {
  return this.http.post<Experiencia>(this.url + 'agregar', experiencia, this.httpOptions);
}


eliminaExperiencia(experiencia: Experiencia) {
  const url = `${this.url + "eliminar"}/${experiencia.id}`;
  return this.http.delete<Boolean>(url, this.httpOptions);
}}
