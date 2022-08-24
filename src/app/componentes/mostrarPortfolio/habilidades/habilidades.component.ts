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
  contenidoDisponible : boolean = false;
  habilidades: Habilidad[] = [];
  nivelConocimientos : Map<number,string> = new Map<number,string>();
  
  

  constructor(private habilidadService: HabilidadService) {
  }

  ngOnInit(): void {
    this.habilidadService.listarHabilidades().subscribe(datos => {
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
      this.habilidades = datos;
      this.contenidoDisponible = true;
    });

    this.nivelConocimientos.set( 20, "Básico");
    this.nivelConocimientos.set( 40, "Principiante");
    this.nivelConocimientos.set( 60, "Intermedio");
    this.nivelConocimientos.set( 80, "Avanzado");
    this.nivelConocimientos.set( 100, "Experto");
  }

}
