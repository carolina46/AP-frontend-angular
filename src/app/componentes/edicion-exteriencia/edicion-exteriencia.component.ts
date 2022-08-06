import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/modelo/experiencia';
import { DomSanitizer } from '@angular/platform-browser';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ExperienciaServiceService } from 'src/app/servicios/experiencia-service.service';

@Component({
  selector: 'app-edicion-exteriencia',
  templateUrl: './edicion-exteriencia.component.html',
  styleUrls: ['./edicion-exteriencia.component.css']
})
export class EdicionExterienciaComponent implements OnInit {

  //Para controlar lo que se muestra en el panel de experiencia
  formularioExperiencia: boolean = false;
  movimientoDeItems: boolean = false;
  //Para cambiar el titulo del formulario, agregar o modificar experiencia laboral
  accion: string = "";
  //Para contron de boton de guardar nueva o existente
  nueva: boolean = true;

  //Para guardar los datos del formulario
  nuevaExperiencia: any;

  //Listado de experiencias laborales
  experiencias: Experiencia[] = [];

  constructor(private sanitizer: DomSanitizer,
    private experienciaService: ExperienciaServiceService) { }

  ngOnInit(): void {
    this.obtenerExperiencia();
  }

  obtenerExperiencia() {
    this.experienciaService.listarExperiencias().subscribe(datos => {
      //ordeno por posicion
      datos.sort(function (a, b) {
        if (a.posicion > b.posicion) {
          return 1;
        }
        if (a.posicion < b.posicion) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      this.experiencias = datos;
    });
  }


  //------NUEVA EXPERIENCIA -----------------
  //Inicializa el furmulario para agregar una nueva experiencia
  mostrarFormularioAgregarExperiencia() {
    this.accion = "AGREGAR EXPERIENCIA LABORAL";
    this.nuevaExperiencia = {
      id: null,
      nombreLugarDeTrabajo: "",
      nombrePuesto: "",
      logoEmpresa: "./assets/experiencia.png",
      desde: "",
      hasta: "",
      descripcionActividades: "",
      posicion: this.experiencias.length,

    };
    this.formularioExperiencia = true;
    this.nueva = true;
  }


  //Manda al backend la experiencia
  guardarNuevaExperiencia() {
    this.experienciaService.guaradarExperiencia(this.nuevaExperiencia).subscribe(data => {
      this.experiencias.push(data);
      this.formularioExperiencia = false;
    }
    );
  }



  //Anula el formulario de experiencia
  cancelarExperiencia() { this.formularioExperiencia = false; }



  //------EDITAR EXPERIENCIA -----------------
  //Inicializa el furmulario para modificar una experiencia existente
  mostrarFormularioEditarExperiencia(experiencia: Experiencia) {
    this.accion = "EDITAR EXPERIENCIA LABORAL"
    this.nuevaExperiencia = experiencia;
    this.formularioExperiencia = true;
    this.nueva = false

  }

  guardarExperiencia() {
    this.experienciaService.guaradarExperiencia(this.nuevaExperiencia).subscribe(data => {
      this.experiencias.splice(this.nuevaExperiencia.posicion, 1, this.nuevaExperiencia);
      this.formularioExperiencia = false;
    }
    );
  }

  //------ELIMINAR UNA EXPERIENCIA -----------------
  eliminarExperiencia(experiencia: Experiencia) {

    this.experienciaService.eliminaExperiencia(experiencia).subscribe(data => {
      //Elimino de la lista interna
      this.experiencias.splice(experiencia.posicion, 1);
      //actualizo nuevas posiciones
      this.actualizarIndices(experiencia.posicion);
      this.obtenerExperiencia();
    });



  }





  //----------------Funcion de mover elementos

  drop(event: CdkDragDrop<Experiencia[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
    this.actualizarIndices(0);
  }

  //------PARA EL CAMBIO DE POSICION -----------------

  actualizarIndices(desde : number) {
    for (let i = desde; i < this.experiencias.length; i++) {
      this.experiencias[i].posicion = i;
      this.experienciaService.guaradarExperiencia(this.experiencias[i]).subscribe(data => {
        console.log( data);
      });
      console.log( this.experiencias[i]);
    }
  }





  //______________Carga de imagen____________________________

  //Permite cargar una nueva imagen cuando se toca
  //el boton editar de alguna imagen del html
  //posicion o es para el banner, 1 es para la foto de perfil
  capturarImagen(event: any) {
    const imagenCapturada = event.target.files[0];
    this.extraerBase64(imagenCapturada).then((imagen: any) => {
      this.nuevaExperiencia.logoEmpresa = imagen.base;
    })


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


}





