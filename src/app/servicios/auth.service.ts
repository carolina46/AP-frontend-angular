import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginUsuario } from '../modelo/LoginUsuario';
import { Observable } from 'rxjs';
import { JwtDTO } from '../modelo/JwtDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 uri = 'https://ap--carolina-perez-backend.herokuapp.com/portfolio/auth/'; 

 constructor(private http: HttpClient) { }

   public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(this.uri + 'login', loginUsuario);
  }
  
}
