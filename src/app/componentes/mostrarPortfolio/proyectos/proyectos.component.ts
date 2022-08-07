import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Proyecto } from 'src/app/modelo/proyecto';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  
  esEdicion: boolean = false;
  

  proyectos: Proyecto[] = [
    {
      id: 0,
      nombre: "Nombre del proyecto",
      descripcion: "Lorem ipsum dolor sit amet. Non illum voluptas fuga quidem in sapiente voluptate eos aliquid iure in enim rerum. At voluptatum eius ab omnis nesciunt qui enim placeat eos labore nobis ea nihil fugiat eos aspernatur consequuntur qui harum molestiae. Id minus reiciendis eumminima totam et quidem ratione et modi labore ex commodi alias 33 explicabo dolorem non assumenda error. Aut recusandae placeat qui nesciunt molestiae aut voluptatem consequatur qui nesciunt commodi ut ipsam optio.",
      desde: "05/1990",
      hasta: "01/2005",
      link: "",
      imagenes: ["./assets/git.ico","./assets/html.ico"],
  
    },
    {
      id: 1,
      nombre: "Nombre del proyecto",
      descripcion: "Lorem ipsum dolor sit amet. Non illum voluptas fuga quidem in sapiente voluptate eos aliquid iure in enim rerum. At voluptatum eius ab omnis nesciunt qui enim placeat eos labore nobis ea nihil fugiat eos aspernatur consequuntur qui harum molestiae. Id minus reiciendis eumminima totam et quidem ratione et modi labore ex commodi alias 33 explicabo dolorem non assumenda error. Aut recusandae placeat qui nesciunt molestiae aut voluptatem consequatur qui nesciunt commodi ut ipsam optio.",
      desde: "05/1990",
      hasta: "01/2005",
      link: "",
      imagenes: ["./assets/proyecto.png"],
  
    },
    {
      id: 2,
      nombre: "Nombre del proyecto",
      descripcion: "Lorem ipsum dolor sit amet. Non illum voluptas fuga quidem in sapiente voluptate eos aliquid iure in enim rerum. At voluptatum eius ab omnis nesciunt qui enim placeat eos labore nobis ea nihil fugiat eos aspernatur consequuntur qui harum molestiae. Id minus reiciendis eumminima totam et quidem ratione et modi labore ex commodi alias 33 explicabo dolorem non assumenda error. Aut recusandae placeat qui nesciunt molestiae aut voluptatem consequatur qui nesciunt commodi ut ipsam optio.",
      desde: "05/1990",
      hasta: "01/2005",
      link: "",
      imagenes: [],
  
    }
  

  ];

  imagenActual : number[] = []

  constructor(private router: Router) {
    if (this.router.url === '/edicionPortfolio')
      this.esEdicion = true;
  }

  ngOnInit(): void {
    for (var i = 0; i < this.proyectos.length; i++) {
      this.imagenActual[i]=0;
    }
    
  }


  imagenSiguiente(id : number){

    this.imagenActual[id]= this.imagenActual[id] + 1;

  }
  imagenAnterior(id : number){
    this.imagenActual[id]-=1;

  }

}
