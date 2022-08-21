import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/modelo/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  usuario: Usuario = {
    id:0,
    nombre: "",
    clave: "",
  }

  constructor(private authService: AuthService,
    private notificacionesService: NotificacionesService) { }

  ngOnInit(): void { }


  iniciarSesion() {
    if (this.usuario.nombre.length == 0 || this.usuario.clave.length == 0) {
      this.notificacionesService.showWarning("Debe completar ambos los campos", "Inicio de Sesion");
    }
    else {
      this.authService.login(this.usuario);
    }

  }










}
