import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/modelo/experiencia';
import { ExperienciaServiceService } from 'src/app/servicios/experiencia-service.service';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css', '../../editarPortfolio/edicion-portfolio/edicion-portfolio.component.css']
})
export class ExperienciaComponent implements OnInit {


  experiencias : Experiencia[] = [];

  constructor(private experienciaService: ExperienciaServiceService) {}

  ngOnInit(): void {
    this.experienciaService.listarExperiencias().subscribe(datos => {
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
      this.experiencias = datos;
    });
  }
  

}
