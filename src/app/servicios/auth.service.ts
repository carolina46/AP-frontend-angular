import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 // uri = 'https://localhost:3000/api'; //remplazar con la api que corresponda

 // token : any;

 constructor() { }
  //constructor(private http: HttpClient, private router: Router) { }

 /* login(usuario: string, contraseña: string) {
    this.http.post(this.uri + '/autenticacion', { nombre: usuario, contraseña: contraseña })
      .subscribe((resp: any) => {
        this.router.navigate(['edicionPortfolio']);
        localStorage.setItem('auth_token', resp.token);
      })
  }

  logout(){
    localStorage.removeItem('token');
  }

  public get logIn(): boolean{
    return(localStorage.getItem('token') !==null);
  }*/
}
