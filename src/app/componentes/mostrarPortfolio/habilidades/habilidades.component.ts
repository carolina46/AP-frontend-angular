import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Habilidad } from 'src/app/modelo/habilidad';
import { HabilidadService } from 'src/app/servicios/habilidad.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  
  //Control si hay contenido para mostrar. 
  //De no haber el componente no se mostrara.
  tieneContenido : boolean = true; 
  //Control de llegada del contenido desde el backend. 
  //Se mostrara animacion de cargando hasta que llegue.
  contenidoDisponible : boolean = false;
  //Contenedor de la lista de habilidades
  habilidades: Habilidad[] = [];

  nivelConocimientos : Map<number,string> = new Map<number,string>();
  
  constructor(private habilidadService: HabilidadService) {
  }

  ngOnInit(): void {
    this.habilidadService.listarHabilidades().subscribe(datos => {
    if(datos.length == 0){
        this.tieneContenido = false;
      }
      else{
        datos.sort(function (a, b) {
          if (a.posicion > b.posicion) {return 1;}
          if (a.posicion < b.posicion) {return -1;}
          return 0;
        });
        this.habilidades = datos;
        this.contenidoDisponible = true;
      }
    });

    this.nivelConocimientos.set( 20, "Básico");
    this.nivelConocimientos.set( 40, "Principiante");
    this.nivelConocimientos.set( 60, "Intermedio");
    this.nivelConocimientos.set( 80, "Avanzado");
    this.nivelConocimientos.set( 100, "Experto");
  }

}
