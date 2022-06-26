import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Habilidad } from 'src/app/modelo/habilidad';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  esEdicion: boolean = false;

  habilidades: Habilidad[] = [
    {
      id: 1,
      nombre: "html",
      porcentajeDominio: 25,
      imagen: "./assets/html.ico",
    },
    {
      id: 2,
      nombre: "css",
      porcentajeDominio: 50,
      imagen: "./assets/css.ico",
    },
    {
      id: 3,
      nombre: "java",
      porcentajeDominio: 75,
      imagen: "./assets/java.ico",
    },
    {
      id: 4,
      nombre: "git",
      porcentajeDominio: 100,
      imagen: "./assets/git.ico",
    },
    {
      id: 5,
      nombre: "angular",
      porcentajeDominio: 25,
      imagen: "./assets/angular.ico",
    },
    {
      id: 6,
      nombre: "python",
      porcentajeDominio: 50,
      imagen: "./assets/python.ico",
    }

  ]


  constructor(private router: Router) {
    if (this.router.url === '/edicionPortfolio')
      this.esEdicion = true;
  }

  ngOnInit(): void {
  }

}
