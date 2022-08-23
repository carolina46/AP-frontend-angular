import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from 'src/app/modelo/LoginUsuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];

  usuario: LoginUsuario = {
    nombreUsuario: "",
    clave: "",
  }

  constructor(private authService: AuthService,
    private notificacionesService: NotificacionesService,
    private tokenService: TokenService,
    private router: Router) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    if (this.usuario.nombreUsuario.length == 0 || this.usuario.clave.length == 0) {
      this.notificacionesService.showWarning("Debe completar ambos campos", "Inicio de Sesion");
    }
    else {

      this.authService.login(this.usuario).subscribe(
        data => {
          this.isLogged = true;
          this.tokenService.setToken(data.token);
          this.tokenService.setUserName(data.nombreUsuario);
          this.tokenService.setAuthorities(data.authorities);
          this.roles = data.authorities;
          this.notificacionesService.showSuccess('Bienvenido ' + data.nombreUsuario, "Panel de edición");
          this.router.navigate(['/edicionPortfolio']);
          console.log("Acceso a la edicion");
        },
        err => {
          this.isLogged = false;
          this.notificacionesService.showError("Usuario o clave incorrecta", "Inicio de Sesion");


        }
      );
    }
  }

  logOut(){
    this.tokenService.logOut();
    window.location.reload();
  }
}

