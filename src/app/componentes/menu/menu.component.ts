import { Component, OnInit } from '@angular/core';
import { RedSocial } from 'src/app/modelo/red-social';
import { Router } from '@angular/router'


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  esEdicion : boolean = false;

  redSocial : RedSocial = {
    id : 1,
    argentinaPrograma : 'https://www.argentina.gob.ar/produccion/transformacion-digital-y-economia-del-conocimiento/argentina-programa',
    facebook : 'https://www.facebook.com/',
    twitter : 'https://www.twitter.com/',
    instagram : 'https://www.instagram.com/',
  }

  constructor(private router: Router) { 
    if(this.router.url === '/edicionPortfolio')
      this.esEdicion = true;
  }

  ngOnInit(): void {
  }

}
