import { Component, OnInit } from '@angular/core';
import { RedesSociales } from 'src/app/modelo/redesSociales';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { RedesService } from 'src/app/servicios/redes.service';

@Component({
  selector: 'app-edicion-redes',
  templateUrl: './edicion-redes.component.html',
  styleUrls: ['./edicion-redes.component.css']
})
export class EdicionRedesComponent implements OnInit {

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
    private notificacionesService: NotificacionesService) { }

  ngOnInit(): void {
    this.redesSocialesService.obtenerDatosResdesSociales().subscribe(datos => {
        if (datos != null) {
        this.redesSociales = datos;   

      }
      else{
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
    this.redesSocialesService.guaradarRedesSociales(this.formulario).subscribe(resultado => {
      if (resultado != undefined) {
        this.redesSociales = resultado;
        this.notificacionesService.showSuccess("Se guardaron los cambios", "Redes Sociales");
      }
      else {
        this.notificacionesService.showError("No se guardaron los cambios", "Redes Sociales");
      }
      this.mostrarFormulario = false;
    });

  }

  cancelar() {
    this.mostrarFormulario = false;
  }

}
