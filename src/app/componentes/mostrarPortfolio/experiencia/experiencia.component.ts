import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/modelo/experiencia';
import { ExperienciaServiceService } from 'src/app/servicios/experiencia-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css', '../../editarPortfolio/edicion-portfolio/edicion-portfolio.component.css']
})
export class ExperienciaComponent implements OnInit {

  //Control si hay contenido para mostrar. 
  //De no haber el componente no se mostrara.
  tieneContenido : boolean = true; 
  //Control de llegada del contenido desde el backend. 
  //Se mostrara animacion de cargando hasta que llegue.
  contenidoDisponible : boolean = false;
  //Contenedor de la lista de experiencias
  experiencias : Experiencia[] = [];

  constructor(private experienciaService: ExperienciaServiceService) {}

  ngOnInit(): void {
    this.experienciaService.listarExperiencias().subscribe(datos => {
      if(datos.length == 0){
        this.tieneContenido = false;
      }
      else{
        datos.sort(function (a, b) {
          if (a.posicion > b.posicion) {return 1;}
          if (a.posicion < b.posicion) {return -1;}
          return 0;
        });
        this.experiencias = datos;
        this.contenidoDisponible = true;
      }
    });
  }
  

}
