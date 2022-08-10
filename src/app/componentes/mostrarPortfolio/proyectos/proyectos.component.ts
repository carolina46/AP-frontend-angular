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
  
  proyectos: Proyecto[] = [];

  imagenActual : number[] = []

  constructor(private proyectoService: ProyectoService) {
  }


  ngOnInit(): void {
    this.proyectoService.listarProyectos().subscribe(datos => {
      //ordeno por posicion
      datos.sort(function (a, b) {
        if (a.posicion > b.posicion) {
          return 1;
        }
        if (a.posicion < b.posicion) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      for(var i=0;i<datos.length; i++){this.imagenActual[i]=0;}
      this.proyectos = datos;
    });

    
  }


  //Gestion de la visualizacion de las imagenes de los proyectos
  imagenSiguiente(p : Proyecto){
    this.imagenActual[p.posicion] +=  1;
  }

  imagenAnterior(p : Proyecto){
    this.imagenActual[p.posicion]-=1;

  }


}
