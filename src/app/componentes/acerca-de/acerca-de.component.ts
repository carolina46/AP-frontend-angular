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
  acercaDe: AcercaDe = {
    id : 0,
    banner : "./assets/banner.jpg",
    fotoPerfil : "./assets/fotoPerfil.jpg",
    nombreCompleto : "Nombre completo",
    titulo : "Título obtenido",
    informacionPersonal :"Descripción resumida de su información personal"
  };

  constructor(private acercaDeservice: AcercaDeService) {}

  ngOnInit(): void {
    //Obtengo los datos de Acerca de
    this.acercaDeservice.obtenerDatosAcercaDe().subscribe(datos => {
      if(datos!=null){
        if (datos.banner == null) {datos.banner = "./assets/banner.jpg"};
        if (datos.fotoPerfil == null) {datos.fotoPerfil = "./assets/fotoPerfil.jpg"};
        if (datos.nombreCompleto == null) {datos.nombreCompleto = "Nombre completo"};
        if (datos.titulo == null) {datos.titulo = "Título obtenido"};
        if (datos.informacionPersonal == null) {datos.informacionPersonal = "Descripción resumida de su información personal"};
        this.acercaDe = datos;
      }
    });
  }
}
