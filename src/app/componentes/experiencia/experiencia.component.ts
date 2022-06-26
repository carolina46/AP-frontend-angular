import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/modelo/experiencia';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css', '../edicion-portfolio/edicion-portfolio.component.css']
})
export class ExperienciaComponent implements OnInit {

  esEdicion : boolean = false;

  experiencias : Experiencia[] = [{
    id : 1,
    nombreLugarDeTrabajo : "ITs La Plata",
    nombrePuesto : "Diseñadora grafica",
    logoEmpresa : "./assets/experiencia.png",
    desde : "05/2011",
    hasta : "05/2012",
    descripcionActividades : "Lorem ipsum dolor sit amet. Non illum voluptas fuga quidem in sapiente voluptate eos aliquid iure in enim rerum. At voluptatum eius ab omnis nesciunt qui enim placeat eos labore nobis ea nihil fugiat eos aspernatur consequuntur qui harum molestiae. Id minus reiciendis eumminima totam et quidem ratione et modi labore ex commodi alias 33 explicabo dolorem non assumenda error. Aut recusandae placeat qui nesciunt molestiae aut voluptatem consequatur qui nesciunt commodi ut ipsam optio.",

  },
  {
    id : 1,
    nombreLugarDeTrabajo : "ITs La Plata",
    nombrePuesto : "Diseñadora grafica",
    logoEmpresa : "./assets/experiencia.png",
    desde : "05/2011",
    hasta : "05/2012",
    descripcionActividades : "Lorem ipsum dolor sit amet. Non illum voluptas fuga quidem in sapiente voluptate eos aliquid iure in enim rerum. At voluptatum eius ab omnis nesciunt qui enim placeat eos labore nobis ea nihil fugiat eos aspernatur consequuntur qui harum molestiae. Id minus reiciendis eumminima totam et quidem ratione et modi labore ex commodi alias 33 explicabo dolorem non assumenda error. Aut recusandae placeat qui nesciunt molestiae aut voluptatem consequatur qui nesciunt commodi ut ipsam optio.",

  },{
    id : 1,
    nombreLugarDeTrabajo : "ITs La Plata",
    nombrePuesto : "Diseñadora grafica",
    logoEmpresa : "./assets/experiencia.png",
    desde : "05/2011",
    hasta : "05/2012",
    descripcionActividades : "Lorem ipsum dolor sit amet. Non illum voluptas fuga quidem in sapiente voluptate eos aliquid iure in enim rerum. At voluptatum eius ab omnis nesciunt qui enim placeat eos labore nobis ea nihil fugiat eos aspernatur consequuntur qui harum molestiae. Id minus reiciendis eumminima totam et quidem ratione et modi labore ex commodi alias 33 explicabo dolorem non assumenda error. Aut recusandae placeat qui nesciunt molestiae aut voluptatem consequatur qui nesciunt commodi ut ipsam optio.",

  }]

  constructor(private router: Router) { 
    if(this.router.url === '/edicionPortfolio')
      this.esEdicion = true;}

  ngOnInit(): void {
  }

}
