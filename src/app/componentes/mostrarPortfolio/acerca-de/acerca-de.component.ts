import { Component, OnInit } from '@angular/core';
import { AcercaDe } from 'src/app/modelo/acerca-de';
import { AcercaDeService } from 'src/app/servicios/acerca-de.service';


@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})

export class AcercaDeComponent implements OnInit {

  //Control si hay contenido para mostrar. 
  //De no haber el componente no se mostrara.
  tieneContenido: boolean = true;
  //Control de llegada del contenido desde el backend. 
  //Se mostrara animacion de cargando hasta que llegue.
  contenidoDisponible: boolean = false;

  //Modelo acercaDe
  acercaDe: AcercaDe = {
    id: 0,
    banner: "",
    fotoPerfil: "",
    nombreCompleto: "",
    titulo: "",
    informacionPersonal: ""
  };

  constructor(private acercaDeservice: AcercaDeService) { }

  ngOnInit(): void {
    //Obtengo los datos de Acerca de
    this.acercaDeservice.obtenerDatosAcercaDe().subscribe(datos => {
      if (datos != null) {
        if (datos.banner.length == 0 &&
          datos.fotoPerfil.length == 0 &&
          datos.nombreCompleto.length == 0 &&
          datos.titulo.length == 0 &&
          datos.informacionPersonal.length == 0) {
          this.tieneContenido = false;
        }
        else {
          this.acercaDe = datos;
          this.contenidoDisponible = true;
        }

      }
      else { this.tieneContenido = false;}

    });
  }
}
