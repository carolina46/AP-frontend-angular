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
      this.proyectos = datos;
    });
  }

  imagenSiguiente(id : number){
    this.imagenActual[id]= this.imagenActual[id] + 1;
  }

  imagenAnterior(id : number){
    this.imagenActual[id]-=1;

  }

}
