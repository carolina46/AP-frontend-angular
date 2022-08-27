import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/modelo/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  //Control si hay contenido para mostrar. 
  //De no haber el componente no se mostrara.
  tieneContenido: boolean = true;
  //Control de llegada del contenido desde el backend. 
  //Se mostrara animacion de cargando hasta que llegue.
  contenidoDisponible: boolean = false;
  //Contenedor de la lista de educacion
  educacion: Educacion[] = [];

  constructor(private educacioService: EducacionService) {
  }

  ngOnInit(): void {
    this.educacioService.listarEducacions().subscribe(datos => {
      if (datos.length == 0) {
        this.tieneContenido = false;
      }
      else {
        datos.sort(function (a, b) {
          if (a.posicion > b.posicion) { return 1; }
          if (a.posicion < b.posicion) { return -1; }
          return 0;
        });
        this.educacion = datos;
        this.contenidoDisponible = true;
      }
    });
  }

}
