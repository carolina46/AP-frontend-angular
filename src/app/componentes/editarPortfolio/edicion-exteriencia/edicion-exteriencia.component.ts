import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/modelo/experiencia';
import { DomSanitizer } from '@angular/platform-browser';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ExperienciaServiceService } from 'src/app/servicios/experiencia-service.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { MatDialog } from '@angular/material/dialog';
import { VentanaConfirmacionComponent } from 'src/app/componentes/editarPortfolio/ventana-confirmacion/ventana-confirmacion.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edicion-exteriencia',
  templateUrl: './edicion-exteriencia.component.html',
  styleUrls: ['./edicion-exteriencia.component.css']
})
export class EdicionExterienciaComponent implements OnInit {

  //Para controlar lo que se muestra en el panel de experiencia
  formularioExperiencia: boolean = false;
  //Para cambiar el titulo del formulario, agregar o modificar experiencia laboral
  accion: string = "";
  //Para contron de boton de guardar nueva o existente
  nueva: boolean = true;

  //Para guardar los datos del formulario
  nuevaExperiencia: any;
  //Para control del imput de la fecha hasta true=seleccionado
  fechaHasta : boolean = true;

  //Listado de experiencias laborales
  experiencias: Experiencia[] = [];

  constructor(private sanitizer: DomSanitizer,
    private experienciaService: ExperienciaServiceService,
    private notificacionesService: NotificacionesService,
    public dialogo: MatDialog) { }

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








  //------------------------------------------------
  //------NUEVA EXPERIENCIA -----------------
  //Inicializa el furmulario para agregar una nueva experiencia
  mostrarFormularioAgregarExperiencia() {
    this.accion = "AGREGAR EXPERIENCIA LABORAL";
    this.nuevaExperiencia = {
      id: null,
      nombreLugarDeTrabajo: "",
      nombrePuesto: "",
      logoEmpresa: "./assets/mas.png",
      desde: null,
      hasta: null,
      descripcionActividades: "",
      posicion: this.experiencias.length,

    };
    this.fechaHasta = false;
    this.formularioExperiencia = true;
    this.nueva = true;
  }

  //Manda al backend la experiencia
  guardarNuevaExperiencia() {
    if (this.comprobarCamposObligatorios()) {
      if (this.comprobarFechas(this.nuevaExperiencia.desde, this.nuevaExperiencia.hasta)) {
        if (this.nuevaExperiencia.logoEmpresa == "./assets/mas.png") {
          this.nuevaExperiencia.logoEmpresa = "";
        }
        this.experienciaService.guaradarExperiencia(this.nuevaExperiencia).subscribe(data => {
          if (data == undefined) {
            this.notificacionesService.showError("No se pudo agregar", "Nueva Experiencia");
          }
          else {
            this.experiencias.push(data);
            this.notificacionesService.showSuccess("Se agrego exitosamente", "Nueva Experiencia");
          }
          this.formularioExperiencia = false;
        }
        );
      }
      else {
        this.notificacionesService.showWarning("La fecha Desde debe ser menor que la fecha Hasta", "Nueva Experiencia");
      }
    }
    else {
      this.notificacionesService.showWarning("Debe completar todos los campos obligatorios", "Nueva Experiencia");
    }
  }

  //Anula el formulario de experiencia
  cancelarExperiencia() { this.formularioExperiencia = false; }

  comprobarCamposObligatorios() {
    
    return (this.nuevaExperiencia.nombreLugarDeTrabajo.length > 0 &&
      this.nuevaExperiencia.nombrePuesto.length > 0 &&
      this.nuevaExperiencia.descripcionActividades.length > 0 &&
      this.nuevaExperiencia.desde != null && !(this.fechaHasta && this.nuevaExperiencia.hasta == null ))
  }

  comprobarFechas(desde: Date, hasta: Date) {
    if (hasta == null) {
      return true;
    }
    else {
      return desde < hasta;

    }

  }

  //------------------------------------------
  //------EDITAR EXPERIENCIA -----------------
  mostrarFormularioEditarExperiencia(experiencia: Experiencia) {
    this.accion = "EDITAR EXPERIENCIA LABORAL"
    this.nuevaExperiencia = {
      id: experiencia.id,
      nombreLugarDeTrabajo: experiencia.nombreLugarDeTrabajo,
      nombrePuesto: experiencia.nombrePuesto,
      logoEmpresa: experiencia.logoEmpresa,
      desde: experiencia.desde,
      hasta: experiencia.hasta,
      descripcionActividades: experiencia.descripcionActividades,
      posicion: experiencia.posicion,
    }
    this.fechaHasta = experiencia.hasta != null;
    if (experiencia.logoEmpresa.length == 0) {
      this.nuevaExperiencia.logoEmpresa = "./assets/mas.png";
    }

    this.nueva = false;
    this.formularioExperiencia = true;
  }

  guardarCambiosExperiencia() {
    if (this.comprobarCamposObligatorios()) {
      if (this.comprobarFechas(this.nuevaExperiencia.desde, this.nuevaExperiencia.hasta)) {


        if (this.nuevaExperiencia.logoEmpresa == "./assets/mas.png") {
          this.nuevaExperiencia.logoEmpresa = "";
        }
        if(!this.fechaHasta){
          this.nuevaExperiencia.hasta = null;
        }
        this.experienciaService.guaradarExperiencia(this.nuevaExperiencia).subscribe(data => {
          this.experiencias.splice(this.nuevaExperiencia.posicion, 1, this.nuevaExperiencia);
          this.formularioExperiencia = false;
          this.notificacionesService.showSuccess("Se guardaron los combios exitosamente", "Modificar Experiencia");

        }
        );
      }
      else {
        this.notificacionesService.showWarning("La fecha Desde debe ser menor que la fecha Hasta", "Modificar Experiencia");

      }
    }
    else {
      this.notificacionesService.showWarning("Debe completar todos los campos obligatorios", "Modificar Experiencia");
    }
  }







  //------------------------------------------------
  //------ELIMINAR UNA EXPERIENCIA -----------------
  eliminarExperiencia(experiencia: Experiencia) {

    this.experienciaService.eliminaExperiencia(experiencia).subscribe(data => {
      if (data) {
        //Elimino de la lista interna
        this.experiencias.splice(experiencia.posicion, 1);
        //actualizo nuevas posiciones
        this.actualizarIndices(experiencia.posicion);
        this.obtenerExperiencia();
        this.notificacionesService.showSuccess("Se guardaron el cambio", "Borrar Experiencia");
      }
      else {
        this.notificacionesService.showError("No se pudo guardar el cambio", "Borrar Experiencia");
      }
    });
  }

  mostrarVentanaConfirmacion(experiencia: Experiencia): void {
    this.dialogo
      .open(VentanaConfirmacionComponent, {
        data: `¿Desea eliminar el elemento?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.eliminarExperiencia(experiencia);
        } else {

        }
      });
  }







  //------------------------------------------------
  //--------------MOVER ELEMENTOS-------------------

  drop(event: CdkDragDrop<Experiencia[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
    this.actualizarIndices(0);
  }

  //------Para el cambio de posicion debido al movimiento -----------------
  actualizarIndices(desde: number) {
    for (let i = desde; i < this.experiencias.length; i++) {
      this.experiencias[i].posicion = i;
      this.experienciaService.guaradarExperiencia(this.experiencias[i]).subscribe(data => {

      });

    }
  }







  //------------------------------------------------
  //-----------CARGA DE IMAGEN-----------------------
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





