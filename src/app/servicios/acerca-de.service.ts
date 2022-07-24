import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcercaDe } from '../modelo/acerca-de';


@Injectable({
  providedIn: 'root'
})


export class AcercaDeService {

  private url : string = 'https://ap--carolina-perez-backend.herokuapp.com/acercaDe/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  constructor(private http: HttpClient) { }

  /** GET: Obtengo la informacion de "Acerca de"*/
  obtenerDatosAcercaDe(): Observable<AcercaDe>{
    return this.http.get<AcercaDe>(this.url + 'obtener');

  }

/** POST: Guardo datos de "Acerca de"*/
 guaradarAcercaDe (acercaDe: AcercaDe): Observable<Boolean> {
  return this.http.post<Boolean>(this.url + 'guardar', acercaDe, this.httpOptions);
}

















}
