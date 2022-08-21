import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../modelo/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 uri = 'http://localhost:8080/autenticacion/'; 

 token : any;

constructor(private http: HttpClient, private router: Router) { }

  login(usuario: Usuario){
    this.http.post(this.uri, usuario)
      .subscribe((resp: any) => {
        this.router.navigate(['edicionPortfolio']);
        localStorage.setItem('auth_token', resp.token);
      });
  }

  logout(){
    localStorage.removeItem('token');
  }

  public isLoggedIn(): boolean{
    return(localStorage.getItem('token') !== null);
  }

  
}
