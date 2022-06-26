import { Component, OnInit } from '@angular/core';
import { AcercaDe } from 'src/app/modelo/acerca-de';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  esEdicion : boolean = false;

  acercaDe : AcercaDe ={
    id : 1,
    banner : "./assets/banner.jpg",
    fotoPerfil : "./assets/foto.jpg",
    nombreCompleto : "Carolina Veronica Perez",
    titulo : "Full Stack Developer Jr.",
    informacionPersonal : "Lorem ipsum dolor sit amet. Non illum voluptas fuga quidem in sapiente voluptate eos aliquid iure in enim rerum. At voluptatum eius ab omnis nesciunt qui enim placeat eos labore nobis ea nihil fugiat eos aspernatur consequuntur qui harum molestiae. Id minus reiciendis eumminima totam et quidem ratione et modi labore ex commodi alias 33 explicabo dolorem non assumenda error. Aut recusandae placeat qui nesciunt molestiae aut voluptatem consequatur qui nesciunt commodi ut ipsam optio.",
  }

  constructor(private router: Router) { 
    if(this.router.url === '/edicionPortfolio')
      this.esEdicion = true;}

  ngOnInit(): void {
  }

}
