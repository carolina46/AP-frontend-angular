import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcercaDe } from '../modelo/acerca-de';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class AcercaDeService {

  private url = 'http://localhost:8080/acercaDe/';
  //private header = ({ headers: new HttpHeaders({ 'Content-Type': 'application/json' })});


  constructor(private http: HttpClient) { }

  /** GET: Obtengo la informacion de "Acerca de"*/
  obtenerDatosAcercaDe(): Observable<AcercaDe>{
    return this.http.get<AcercaDe>(this.url + 'obtener');

  }

/** PUT: actualizamos la imagen del banner en el servido
actualizarImagenBanner (banner: string): Observable<Boolean> {
  let body = JSON.stringify(banner); 
  return this.http.put<Boolean>(this.url + 'banner/actualizar', body, this.header);
}
*/
















}
