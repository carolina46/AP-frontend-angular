
import { Component, OnInit } from '@angular/core';
import { AcercaDe } from 'src/app/modelo/acerca-de';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ReadVarExpr } from '@angular/compiler';
import { AcercaDeService } from 'src/app/servicios/acerca-de.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edicion-acerca-de',
  templateUrl: './edicion-acerca-de.component.html',
  styleUrls: ['./edicion-acerca-de.component.css']
})
export class EdicionAcercaDeComponent implements OnInit {



  //Para saber si se cargo una nueva imagen.
  //False muestra boton editar - true muestra botones aceptar y cancelar 
  //posicion 0 es del banner y la 1 de la foto de perfil
  nuevaImagen: boolean[] = [false, false];
  //Al editar una imagen se guarda temporalmente la imagen anterior, 
  //por si no quiere conserbar la nueva imagen elegida.
  imagenTemporal: string[] = ["", ""];
  //Para controlar el formulario de edicion de datos
  edicionDatosDePerfil: boolean = false;


  //Modelo acercaDe
  acercaDe: AcercaDe = {
    id: 0,
    banner: "./assets/banner.jpg",
    fotoPerfil: "./assets/fotoPerfil.jpg",
    nombreCompleto: "Carolina Veronica Perez",
    titulo: "",
    informacionPersonal: "Agregar información personal",
  };

  constructor(private acercaDeservice: AcercaDeService,
    private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    //Obtengo los datos de Acerca de del servidor
    this.acercaDeservice.obtenerDatosAcercaDe().subscribe(datos => { this.acercaDe = datos; });
  }


   //______________Carga de imagen____________________________

  //Permite cargar una nueva imagen cuando se toca
  //el boton editar de alguna imagen del html
  //posicion o es para el banner, 1 es para la foto de perfil
  capturarImagen(event: any, posicion: number) {
    const imagenCapturada = event.target.files[0];
    this.extraerBase64(imagenCapturada).then((imagen: any) => {
      if (posicion == 0) {
        this.imagenTemporal[posicion] = this.acercaDe.banner;
        this.acercaDe.banner = imagen.base;
      }
      else {
        this.imagenTemporal[posicion] = this.acercaDe.fotoPerfil;
        this.acercaDe.fotoPerfil = imagen.base;
      }

    })
    this.nuevaImagen[posicion] = true;

  }

  //Convierte la imagen elegida para poder hacer la previsualizacion
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => { resolve({ base: reader.result }); };
      reader.onerror = error => { resolve({ base: null }); };
      return reader;
    } catch (e) { return null; }
  })


  //____________________________banner____________________________

  aceptarNuevoBanner() {
    this.nuevaImagen[0] = false;
    this.acercaDeservice.guaradarAcercaDe(this.acercaDe).subscribe();
  }

  cancelarNuevoBanner() {
    this.acercaDe.banner = this.imagenTemporal[0];
    this.nuevaImagen[0] = false;
  }


  //____________________________Foto de perfil____________________________

  aceptarNuevaFotoDePerfil() {
    this.nuevaImagen[1] = false;
    console.log(this.acercaDe);
    this.acercaDeservice.guaradarAcercaDe(this.acercaDe).subscribe();
  }

  cancelarNuevaFotoDePerfil() {
    this.acercaDe.fotoPerfil = this.imagenTemporal[1];
    this.nuevaImagen[1] = false;
  }


  //____________________________Datos de perfil____________________________
  editarDatosDePerfil() {
    this.edicionDatosDePerfil = true;

  }

  guardarDatosPerefil() {
    console.log(this.acercaDe);
    this.acercaDeservice.guaradarAcercaDe(this.acercaDe).subscribe();
    this.edicionDatosDePerfil = false;

  }
  cancelarDatosPerefil() {
    this.edicionDatosDePerfil = false;
  }







}
