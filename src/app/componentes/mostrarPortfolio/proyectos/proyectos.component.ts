import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/modelo/proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  //Control si hay contenido para mostrar. 
  //De no haber el componente no se mostrara.
  tieneContenido: boolean = true;
  //Control de llegada del contenido desde el backend. 
  //Se mostrara animacion de cargando hasta que llegue.
  contenidoDisponible: boolean = false;
  //Contenedor de la lista de proyectos
  proyectos: Proyecto[] = [];

  imagenActual: number[] = []

  constructor(private proyectoService: ProyectoService) {
  }


  ngOnInit(): void {
    this.proyectoService.listarProyectos().subscribe(datos => {
      if (datos.length == 0) {
        this.tieneContenido = false;
      }
      else {
        datos.sort(function (a, b) {
          if (a.posicion > b.posicion) { return 1; }
          if (a.posicion < b.posicion) { return -1; }
          return 0;
        });
        for (var i = 0; i < datos.length; i++) { this.imagenActual[i] = 0; }
        this.proyectos = datos;
        this.contenidoDisponible = true;
      }
    });


  }


  //Gestion de la visualizacion de las imagenes de los proyectos
  imagenSiguiente(p: Proyecto) {
    this.imagenActual[p.posicion] += 1;
  }

  imagenAnterior(p: Proyecto) {
    this.imagenActual[p.posicion] -= 1;

  }


}
