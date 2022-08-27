import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Educacion } from 'src/app/modelo/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { VentanaConfirmacionComponent } from '../ventana-confirmacion/ventana-confirmacion.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edicion-educacion',
  templateUrl: './edicion-educacion.component.html',
  styleUrls: ['./edicion-educacion.component.css']
})
export class EdicionEducacionComponent implements OnInit {
  
  //Control de llegada del contenido desde el backend. 
  //Se mostrara animacion de cargando hasta que llegue.
  contenidoDisponible: boolean = false;
  //Para controlar lo que se muestra en el panel de educacion
  formularioEducacion: boolean = false;
  //Para cambiar el titulo del formulario, agregar o modificar Educacion
  accion: string = "";
  //Para control de boton de guardar una educacion nueva o existente
  nueva: boolean = true;

  //Para guardar los datos del formulario
  educacionFormulario: any;
  //Para control del imput de la fecha hasta true=seleccionado
  fechaHasta : boolean = true;

  //Listado de educacion
  educacion: Educacion[] = [];

  constructor(private sanitizer: DomSanitizer,
    private educacionService: EducacionService,
    private notificacionesService: NotificacionesService,
    public dialogo: MatDialog) { }

  ngOnInit(): void {
    this.obtenerEducacion();
  }

  obtenerEducacion() {
    this.educacionService.listarEducacions().subscribe(datos => {
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
      this.educacion = datos;
      this.contenidoDisponible = true;
    });
  }









  //------------------------------------------------
  //-------------- NUEVA EDUCACION -----------------
  //------------------------------------------------

  //Inicializa el furmulario para agregar una nueva educcion
  mostrarFormularioAgregarEducacion() {
    this.accion = "AGREGAR EDUCACIÓN";
    this.educacionFormulario = {
      id: null,
      nombreInstitucion: "",
      tituloObtenido: "",
      logoInstitucional: "./assets/mas.png",
      desde: null,
      hasta: null,
      posicion: this.educacion.length,
    };
    this.fechaHasta = false;
    this.formularioEducacion = true;
    this.nueva = true;
  }

  //Manda al backend la nueva esucacion
  guardarNuevaEducacion() {
    if (this.comprobarCamposObligatorios()) {
      if (this.comprobarFechas(this.educacionFormulario.desde, this.educacionFormulario.hasta)) {
        
        if (this.educacionFormulario.logoInstitucional == "./assets/mas.png") {
          this.educacionFormulario.logoInstitucional = "";
        }

        this.educacionService.guaradarEducacion(this.educacionFormulario).subscribe(data => {
          if (data == undefined) {
            this.notificacionesService.showError("No se pudo agregar", "Nueva Educación");
          }
          else {
            this.educacion.push(data);
            this.notificacionesService.showSuccess("Se agrego exitosamente", "Nueva Educación");
          }
          this.formularioEducacion = false;
        }
        );
      }
      else {
        this.notificacionesService.showWarning("La fecha Desde debe ser menor que la fecha Hasta", "Nueva Educación");

      }

    }
    else {
      this.notificacionesService.showWarning("Debe completar todos los campos obligatorios", "Nueva Educación");
    }
  }

  //No se agrega la nueva educacion
  cancelarEducacion() { this.formularioEducacion = false; }

  //Comprobacion que los datos obligatorios no sean vacios
  comprobarCamposObligatorios() {
    return (this.educacionFormulario.nombreInstitucion.length > 0 &&
      this.educacionFormulario.tituloObtenido.length > 0 &&
      this.educacionFormulario.desde != null && 
      !(this.fechaHasta && this.educacionFormulario.hasta == null ))
  }

  //Comprobacion fechas: desde debe ser menor que hasta
  comprobarFechas(desde: Date, hasta: Date) {
    if (hasta == null) {return true;}
    else {return desde < hasta;}
  }









  //------------------------------------------
  //------- EDITAR EDUCACION -----------------
  //------------------------------------------

  //Inicializa el furmulario para modificar una educacion existente
  mostrarFormularioEditarEducacion(educacion: Educacion) {
    this.accion = "EDITAR EDUCACIÓN"
    this.educacionFormulario = {
      id: educacion.id,
      nombreInstitucion: educacion.nombreInstitucion,
      tituloObtenido: educacion.tituloObtenido,
      logoInstitucional: educacion.logoInstitucional,
      desde: educacion.desde,
      hasta: educacion.hasta,
      posicion: educacion.posicion,
    }
    this.fechaHasta = educacion.hasta != null;
    if (educacion.logoInstitucional.length == 0) {
      this.educacionFormulario.logoInstitucional = "./assets/mas.png";
    }
    
    this.nueva = false;
    this.formularioEducacion = true;
  }

  //Mandamos al backend las modificaciones
  guardarCambiosEducacion() {
    if (this.comprobarCamposObligatorios()) {
      if (this.comprobarFechas(this.educacionFormulario.desde, this.educacionFormulario.hasta)) {
        if (this.educacionFormulario.logoInstitucional == "./assets/mas.png") {
          this.educacionFormulario.logoInstitucional = "";
        }
        if(!this.fechaHasta){
          this.educacionFormulario.hasta = null;
        }
        this.educacionService.guaradarEducacion(this.educacionFormulario).subscribe(data => {
          this.educacion.splice(this.educacionFormulario.posicion, 1, this.educacionFormulario);
          this.formularioEducacion = false;
          this.notificacionesService.showSuccess("Se guardaron los combios exitosamente", "Modificar Educación");
        }
        );
      }
      else {
        this.notificacionesService.showWarning("La fecha Desde debe ser menor que la fecha Hasta", "Modificar Educación");
      }
    }
    else {
      this.notificacionesService.showWarning("Debe completar todos los campos obligatorios", "Modificar Educación");
    }
  }









  //-------------------------------------------------
  //-------- ELIMINAR UNA EDUCACION -----------------
  //-------------------------------------------------

  //Elimino una educacion seleccionada
  eliminarEducacion(educacion: Educacion) {
    this.educacionService.eliminaEducacion(educacion).subscribe(data => {
      if (data) {
        //Elimino de la lista interna
        this.educacion.splice(educacion.posicion, 1);
        //actualizo nuevas posiciones
        this.actualizarIndices(educacion.posicion);
        this.obtenerEducacion();
        this.notificacionesService.showSuccess("Se guardaron el cambio", "Borrar Educación");
      }
      else {
        this.notificacionesService.showError("No se pudo guardar el cambio", "Borrar Educación");
      }
    });
  }

  //Se pide confirmacion antes de borrar
  mostrarVentanaConfirmacion(educacion: Educacion): void {
    this.dialogo
      .open(VentanaConfirmacionComponent, {
        data: `¿Desea eliminar el elemento?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.eliminarEducacion(educacion);
        }});
  }









  //------------------------------------------------
  //--------------MOVER ELEMENTOS-------------------
  //------------------------------------------------

  drop(event: CdkDragDrop<Educacion[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
    this.actualizarIndices(0);
  }

  //------Para el cambio de posicion debido al movimiento -----------------
  actualizarIndices(desde: number) {
    for (let i = desde; i < this.educacion.length; i++) {
      this.educacion[i].posicion = i;
      this.educacionService.guaradarEducacion(this.educacion[i]).subscribe(data => {

      });

    }
  }









  //------------------------------------------------
  //-----------CARGA DE IMAGEN-----------------------
  //------------------------------------------------

  //Permite cargar una nueva imagen cuando se toca
  //el boton editar de alguna imagen del html
  capturarImagen(event: any) {
    const imagenCapturada = event.target.files[0];
    this.extraerBase64(imagenCapturada).then((imagen: any) => {
      this.educacionFormulario.logoInstitucional = imagen.base;
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
