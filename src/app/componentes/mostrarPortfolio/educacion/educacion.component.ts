import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/modelo/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  esEdicion: boolean = false;

  educacion: Educacion[] = [];

  constructor(private educacioService : EducacionService) {
  }

  ngOnInit(): void {
    this.educacioService.listarEducacions().subscribe(datos => {
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
    this.educacion = datos;
  });
}

}
