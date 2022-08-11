import { Component, OnInit } from '@angular/core';
import { RedesSociales } from 'src/app/modelo/redesSociales';
import { Router } from '@angular/router'
import { RedesService } from 'src/app/servicios/redes.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  
  redesSociales : RedesSociales ={
    id : 0,
    argentinaPrograma : 'https://www.argentina.gob.ar/produccion/transformacion-digital-y-economia-del-conocimiento/argentina-programa',
    facebook : 'https://www.facebook.com/',
    twitter : 'https://www.twitter.com/',
    instagram : 'https://www.instagram.com/',
  };

  constructor(private redesSocialesService : RedesService) { }

  ngOnInit(): void {
    this.redesSocialesService.obtenerDatosResdesSociales().subscribe(datos =>{
      if (datos != null) {
        this.redesSociales = {
          id : 0,
          argentinaPrograma : 'https://www.argentina.gob.ar/produccion/transformacion-digital-y-economia-del-conocimiento/argentina-programa',
          facebook : 'https://www.facebook.com/',
          twitter : 'https://www.twitter.com/',
          instagram : 'https://www.instagram.com/',
        }
      }
      else{
        this.redesSociales=datos;
      }
      
    });
  }

}
