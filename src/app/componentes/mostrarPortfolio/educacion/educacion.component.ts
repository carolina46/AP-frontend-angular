import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Educacion } from 'src/app/modelo/educacion';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  esEdicion: boolean = false;

  educacion: Educacion[] = [
    {
      id: 1,
      nombreInstitucion: "Nombre Instituto",
      tituloObtenido: "Carrera o titulo obtenido",
      logoInstitucional: "./assets/educacion.png",
      desde: "03/2018",
      hasta: "Actualidad",
    },
    {
      id: 1,
      nombreInstitucion: "Nombre Instituto",
      tituloObtenido: "Carrera o titulo obtenido",
      logoInstitucional: "./assets/educacion.png",
      desde: "03/2018",
      hasta: "05/2021",
    },
    {
      id: 1,
      nombreInstitucion: "Nombre Instituto",
      tituloObtenido: "Carrera o titulo obtenido",
      logoInstitucional: "./assets/educacion.png",
      desde: "03/2018",
      hasta: "Actualidad",
    }
  ]


  constructor(private router: Router) {
    if (this.router.url === '/edicionPortfolio')
      this.esEdicion = true;
  }

  ngOnInit(): void {
  }

}
