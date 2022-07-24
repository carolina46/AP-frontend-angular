import { Component, OnInit } from '@angular/core';
import { AcercaDe } from 'src/app/modelo/acerca-de';
import { AcercaDeService } from 'src/app/servicios/acerca-de.service';


@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})

export class AcercaDeComponent implements OnInit {

 
  //Modelo acercaDe
  acercaDe: AcercaDe={
    id: 1,
    banner: "./assets/banner.jpg",
    fotoPerfil: "./assets/foto.jpg",
    nombreCompleto: "Carolina Veronica Perez",
    titulo: "Full Stack Developer Jr.",
    informacionPersonal: "Lorem ipsum dolor sit amet. Non illum voluptas fuga quidem in sapiente voluptate eos aliquid iure in enim rerum. At voluptatum eius ab omnis nesciunt qui enim placeat eos labore nobis ea nihil fugiat eos aspernatur consequ.",
  }
  
  /*{
    id : 0,
    banner: "",
    fotoPerfil: "",
    nombreCompleto: "",
    titulo: "",
    informacionPersonal: "",
  }*/



  constructor(private acercaDeservice: AcercaDeService) {
   
  }

  ngOnInit(): void {
    //Obtengo los datos de Acerca de
    this.acercaDeservice.obtenerDatosAcercaDe().subscribe(datos => {this.acercaDe=datos;
    console.log(datos)});
  }
}
