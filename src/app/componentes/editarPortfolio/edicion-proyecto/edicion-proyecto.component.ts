import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Proyecto } from 'src/app/modelo/proyecto';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { ProyectoService } from 'src/app/servicios/proyecto.service';
import { VentanaConfirmacionComponent } from '../ventana-confirmacion/ventana-confirmacion.component';

@Component({
  selector: 'app-edicion-proyecto',
  templateUrl: './edicion-proyecto.component.html',
  styleUrls: ['./edicion-proyecto.component.css']
})
export class EdicionProyectoComponent implements OnInit {

  //Control de llegada del contenido desde el backend. 
  //Se mostrara animacion de cargando hasta que llegue.
  contenidoDisponible: boolean = false;
  //Para controlar lo que se muestra en el panel de proyectos
  mostrarFormularioProyecto: boolean = false;
  //Para cambiar el titulo del formulario, agregar o modificar Proyecto
  accion: string = "";
  //Para control de boton de guardar un proyecto nuevo o existente
  nueva: boolean = true;

  //Para guardar los datos del formulario
  proyectoFormulario: any;
  //Para control del imput de la fecha hasta true=seleccionado
  fechaHasta : boolean = true;

  //Listado de proyectos
  proyectos: Proyecto[] = [];
  //Para ir visualisando la lista de imagenes de cada proyecto
  imagenActual : number[] = []


  constructor(private sanitizer: DomSanitizer,
    private proyectoService: ProyectoService,
    private notificacionesService: NotificacionesService,
    public dialogo: MatDialog) { }



    ngOnInit(): void {
      this.obtenerProyectos();
    }
  
    obtenerProyectos() {
      this.proyectoService.listarProyectos().subscribe(datos => {
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
        for(var i=0;i<datos.length; i++){this.imagenActual[i]=0;}
        this.proyectos = datos;
        this.contenidoDisponible = true;
      });
    }


    //Gestion de la visualizacion de las imagenes de los proyectos
    imagenSiguiente(p : Proyecto){
      this.imagenActual[p.posicion] +=  1;
    }
  
    imagenAnterior(p : Proyecto){
      this.imagenActual[p.posicion]-=1;
  
    }

   






    //------------------------------------------------
    //-------------- NUEVO PROYECTO -----------------
    //------------------------------------------------
    //Inicializa el furmulario para agregar un nuevo Proyecto
    mostrarFormularioAgregarProyecto() {
      this.accion = "AGREGAR PROYECTO";
      this.proyectoFormulario = {
        id: null,
        nombre: "",
        descripcion: "",
        link: "",
        imagenes: [],
        desde: null,
        hasta: null,
        posicion: this.proyectos.length,
      };
      this.fechaHasta = false;
      this.mostrarFormularioProyecto = true;
      this.nueva = true;
    }
  
    //Manda al backend el nuevo proyecto
    guardarNuevoProyecto() {
      if (this.comprobarCamposObligatorios()) {
        if (this.comprobarFechas(this.proyectoFormulario.desde, this.proyectoFormulario.hasta)) {
          this.proyectoService.guaradarProyecto(this.proyectoFormulario).subscribe(data => {
            if (data == undefined) {
              this.notificacionesService.showError("No se pudo agregar", "Nuevo Proyecto");
            }
            else {
              this.proyectos.push(data);
              this.notificacionesService.showSuccess("Se agrego exitosamente", "Nuevo Proyecto");
            }
            this.mostrarFormularioProyecto = false;
          }
          );
        }
        else {
          this.notificacionesService.showWarning("La fecha Desde debe ser menor que la fecha Hasta", "Nuevo Proyecto");
  
        }
  
      }
      else {
        this.notificacionesService.showWarning("Debe completar todos los campos obligatorios", "Nuevo Proyecto");
      }
    }
  
    //No se agrega el nuevo Proyecto
    cancelarProyecto() { this.mostrarFormularioProyecto = false; }
  
    //Comprobacion que los datos obligatorios no sean vacios
    comprobarCamposObligatorios() {
      return (this.proyectoFormulario.nombre.length > 0 &&
        this.proyectoFormulario.descripcion.length > 0 &&
        this.proyectoFormulario.link.length > 0 &&
        this.proyectoFormulario.desde != null && 
        !(this.fechaHasta && this.proyectoFormulario.hasta == null ))
    }
  
    //Comprobacion fechas: desde debe ser menor que hasta
    comprobarFechas(desde: Date, hasta: Date) {
      if (hasta == null) {return true;}
      else {return desde < hasta;}
    }
  
    eliminarImagen(index : number){
      this.proyectoFormulario.imagenes.splice(index, 1);

    }
    //Se pide confirmacion antes de borrar
  mostrarVentanaConfirmacionImagen(posicion : number): void {
    this.dialogo
      .open(VentanaConfirmacionComponent, {
        data: `¿Desea eliminar el elemento?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.eliminarImagen(posicion);
          
        }});
  }

  informarMovimiento(){
    this.notificacionesService.showInfo("Arrastre el elemento para cambiarlo de posición", "Imagenes del proyecto");

  }









  //------------------------------------------
  //------- EDITAR PROYECTO -----------------
  //------------------------------------------

  //Inicializa el furmulario para modificar un Proyecto existente
  mostrarFormularioEditarProyecto(proyecto: Proyecto) {
    this.accion = "EDITAR PROYECTO"
    this.proyectoFormulario = {
      id: proyecto.id,
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      imagenes: proyecto.imagenes,
      link: proyecto.link,
      desde: proyecto.desde,
      hasta: proyecto.hasta,
      posicion: proyecto.posicion,
    }
    this.fechaHasta = proyecto.hasta != null;
    this.nueva = false;
    this.mostrarFormularioProyecto = true;
  }

  //Mandamos al backend las modificaciones
  guardarCambiosProyecto() {
    if (this.comprobarCamposObligatorios()) {
      if (this.comprobarFechas(this.proyectoFormulario.desde, this.proyectoFormulario.hasta)) {
        if(!this.fechaHasta){
          this.proyectoFormulario.hasta = null;
        }
        this.proyectoService.guaradarProyecto(this.proyectoFormulario).subscribe(data => {
          this.proyectos.splice(this.proyectoFormulario.posicion, 1, this.proyectoFormulario);
          this.mostrarFormularioProyecto = false;
          this.notificacionesService.showSuccess("Se guardaron los combios exitosamente", "Modificar proyecto");
        }
        );
      }
      else {
        this.notificacionesService.showWarning("La fecha Desde debe ser menor que la fecha Hasta", "Modificar proyecto");
      }
    }
    else {
      this.notificacionesService.showWarning("Debe completar todos los campos obligatorios", "Modificar proyecto");
    }
  }
  









  //-------------------------------------------------
  //---------- ELIMINAR UN PROYECTO -----------------
  //-------------------------------------------------

  //Elimino un proyecto seleccionadO
  eliminarProyecto(proyecto: Proyecto) {
    this.proyectoService.eliminaProyecto(proyecto).subscribe(data => {
      if (data) {
        //Elimino de la lista interna
        this.proyectos.splice(proyecto.posicion, 1);
        //actualizo nuevas posiciones
        this.actualizarIndices(proyecto.posicion);
        this.obtenerProyectos();
        this.notificacionesService.showSuccess("Se guardaron el cambio", "Borrar Proyecto");
      }
      else {
        this.notificacionesService.showError("No se pudo guardar el cambio", "Borrar Proyecto");
      }
    });
  }

  //Se pide confirmacion antes de borrar
  mostrarVentanaConfirmacion(proyecto: Proyecto): void {
    this.dialogo
      .open(VentanaConfirmacionComponent, {
        data: `¿Desea eliminar el elemento?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
         this.eliminarProyecto(proyecto);
          
        }});
  }









  //------------------------------------------------
  //--------------MOVER ELEMENTOS-------------------
  //------------------------------------------------

  drop(event: CdkDragDrop<Proyecto[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
    this.actualizarIndices(0);
  }

  //------Para el cambio de posicion debido al movimiento -----------------
  actualizarIndices(desde: number) {
    for (let i = desde; i < this.proyectos.length; i++) {
      this.proyectos[i].posicion = i;
      this.proyectoService.guaradarProyecto(this.proyectos[i]).subscribe(data => {

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
      this.proyectoFormulario.imagenes.push(imagen.base);
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
