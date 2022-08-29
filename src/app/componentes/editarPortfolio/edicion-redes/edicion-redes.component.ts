import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RedesSociales } from 'src/app/modelo/redesSociales';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { RedesService } from 'src/app/servicios/redes.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-edicion-redes',
  templateUrl: './edicion-redes.component.html',
  styleUrls: ['./edicion-redes.component.css']
})
export class EdicionRedesComponent implements OnInit {

  presionoGuardar: boolean = false;
  mostrarFormulario: boolean = false;
  formulario: any;

  redesSociales: RedesSociales = {
    id: 0,
    argentinaPrograma: 'https://www.argentina.gob.ar/produccion/transformacion-digital-y-economia-del-conocimiento/argentina-programa',
    facebook: 'https://www.facebook.com/',
    twitter: 'https://www.twitter.com/',
    instagram: 'https://www.instagram.com/',
  };

  constructor(private redesSocialesService: RedesService,
    private tokenService: TokenService,
    private notificacionesService: NotificacionesService,
    private router: Router) { }

  ngOnInit(): void {
    this.redesSocialesService.obtenerDatosResdesSociales().subscribe(datos => {
      if (datos != null) {
        this.redesSociales = datos;

      }
      else {
        this.redesSociales = {
          id: 0,
          argentinaPrograma: 'https://www.argentina.gob.ar/produccion/transformacion-digital-y-economia-del-conocimiento/argentina-programa',
          facebook: 'https://www.facebook.com/',
          twitter: 'https://www.twitter.com/',
          instagram: 'https://www.instagram.com/',
        };
      }
    });
  }






  editarRedesSociales() {
    this.formulario = {
      id: this.redesSociales.id,
      facebook: this.redesSociales.facebook,
      twitter: this.redesSociales.twitter,
      instagram: this.redesSociales.instagram,
      argentinaPrograma: this.redesSociales.argentinaPrograma,
    }
    this.mostrarFormulario = true;
  }

  guardar() {
    this.presionoGuardar = true;
    if (this.comprobarCamposObligatorios()) {
      this.redesSocialesService.guaradarRedesSociales(this.formulario).subscribe(resultado => {
        if (resultado != undefined) {
          this.redesSociales = resultado;
          this.notificacionesService.showSuccess("Se guardaron los cambios", "Redes Sociales");
        }
        else {
          this.notificacionesService.showError("No se guardaron los cambios", "Redes Sociales");
        }
        this.mostrarFormulario = false;
        this.presionoGuardar = false;
      });
    }
    else {
      this.notificacionesService.showWarning("Debe completar todos los campos obligatorios", "Redes Sociales");
      this.presionoGuardar = false;
    }

  }

  //Comprobacion que los datos obligatorios no sean vacios
  comprobarCamposObligatorios() {
    return (this.redesSociales.facebook.length > 0 &&
      this.redesSociales.twitter.length > 0 &&
      this.redesSociales.instagram.length > 0 &&
      this.redesSociales.argentinaPrograma.length > 0 )
  }

  cancelar() {
    this.mostrarFormulario = false;
  }

  logOut() {
    this.tokenService.logOut();
    this.router.navigate(['/']);
  }
}
