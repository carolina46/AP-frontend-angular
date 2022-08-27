import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { Habilidad } from 'src/app/modelo/habilidad';
import { HabilidadService } from 'src/app/servicios/habilidad.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { VentanaConfirmacionComponent } from '../ventana-confirmacion/ventana-confirmacion.component';

@Component({
  selector: 'app-edicion-habilidad',
  templateUrl: './edicion-habilidad.component.html',
  styleUrls: ['./edicion-habilidad.component.css']
})
export class EdicionHabilidadComponent implements OnInit {

  //Control de llegada del contenido desde el backend. 
  //Se mostrara animacion de cargando hasta que llegue.
  contenidoDisponible: boolean = false;
  //Para controlar si se muestra o no el formulario de habilidad
  mostrarFormularioHabilidad: boolean = false;
  //Para cambiar el titulo del formulario, agregar o modificar habilidad
  accion: string = "";
  //Para control de boton de guardar una habilidad nueva o existente
  nueva: boolean = true;

  //Para guardar los datos del formulario
  habilidadFormulario: any;
  
  //Listado de educacion
  habilidades: Habilidad[] = [];

  constructor(private sanitizer: DomSanitizer,
    private habilidadService: HabilidadService,
    private notificacionesService: NotificacionesService,
    public dialogo: MatDialog) { }

  ngOnInit(): void {
    this.obtenerHabilidades();
  }

  obtenerHabilidades() {
    this.habilidadService.listarHabilidades().subscribe(datos => {
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
      this.habilidades = datos;
      this.contenidoDisponible = true;
    });
  }









  //------------------------------------------------
  //-------------- NUEVA HABILIDAD -----------------
  //------------------------------------------------

  //Inicializa el furmulario para agregar una nueva habilidad
  mostrarFormularioAgregarHabilidad() {
    this.accion = "AGREGAR HABILIDAD";
    this.habilidadFormulario = {
      id: null,
      nombre: "",
      porcentajeDominio: null,
      imagen: "./assets/mas.png",
      posicion: this.habilidades.length,
    };
    this.mostrarFormularioHabilidad = true;
    this.nueva = true;
  }

  //Manda al backend la nueva habilidad
  guardarNuevaHabilidad() {
    if (this.comprobarCamposObligatorios()) {
      if (this.habilidadFormulario.imagen == "./assets/mas.png") {
        this.habilidadFormulario.imagen = "";
      }
      this.habilidadService.guaradarHabilidad(this.habilidadFormulario).subscribe(data => {
        if (data == undefined) {
          this.notificacionesService.showError("No se pudo agregar", "Nueva Habilidad");
        }
        else {
          this.habilidades.push(data);
          this.notificacionesService.showSuccess("Se agrego exitosamente", "Nueva Habilidad");
        }
        this.mostrarFormularioHabilidad = false;
      }
      );
    }
    else {
      this.notificacionesService.showWarning("Debe completar todos los campos obligatorios", "Nueva Habilidad");
    }
  }

  //No se agrega la nueva Habilidad
  cancelarHabilidad() { this.mostrarFormularioHabilidad = false; }

  //Comprobacion que los datos obligatorios no sean vacios
  comprobarCamposObligatorios() {
    return (this.habilidadFormulario.nombre.length && 
      this.habilidadFormulario.porcentajeDominio!=null &&
      this.habilidadFormulario.imagen != "./assets/mas.png")
  }









  //------------------------------------------
  //------- EDITAR HABILIDAD -----------------
  //------------------------------------------

  //Inicializa el furmulario para modificar una educacion existente
  mostrarFormularioEditarHabilidad(habilidad: Habilidad) {
    this.accion = "EDITAR HABILIDAD"
    this.habilidadFormulario = {
      id: habilidad.id,
      nombre: habilidad.nombre,
      imagen: habilidad.imagen,
      porcentajeDominio : habilidad.porcentajeDominio,
      posicion: habilidad.posicion,
    }
    if (habilidad.imagen.length == 0) {
      this.habilidadFormulario.imagen = "./assets/mas.png";
    }
    this.nueva = false;
    this.mostrarFormularioHabilidad = true;
  }

  //Mandamos al backend las modificaciones
  guardarCambiosHabilidad() {
    if (this.comprobarCamposObligatorios()) {
        if (this.habilidadFormulario.imagen == "./assets/mas.png") {
          this.habilidadFormulario.imagen = "";
        }
        this.habilidadService.guaradarHabilidad(this.habilidadFormulario).subscribe(data => {
          this.habilidades.splice(this.habilidadFormulario.posicion, 1, this.habilidadFormulario);
          this.mostrarFormularioHabilidad = false;
          this.notificacionesService.showSuccess("Se guardaron los combios exitosamente", "Modificar Habilidad");
        }
        );
    }
    else {
      this.notificacionesService.showWarning("Debe completar todos los campos obligatorios", "Modificar Habilidad");
    }
  }









  //-------------------------------------------------
  //-------- ELIMINAR UNA HABILIDAD -----------------
  //-------------------------------------------------

  //Elimino una educacion seleccionada
  eliminarHabilidad(habilidad: Habilidad) {
    this.habilidadService.eliminaHabilidad(habilidad).subscribe(data => {
      if (data) {
        //Elimino de la lista interna
        this.habilidades.splice(habilidad.posicion, 1);
        //actualizo nuevas posiciones
        this.actualizarIndices(habilidad.posicion);
        this.obtenerHabilidades();
        this.notificacionesService.showSuccess("Se guardaron el cambio", "Borrar Habilidad");
      }
      else {
        this.notificacionesService.showError("No se pudo guardar el cambio", "Borrar Habilidad");
      }
    });
  }

  //Se pide confirmacion antes de borrar
  mostrarVentanaConfirmacion(habilidad: Habilidad): void {
    this.dialogo
      .open(VentanaConfirmacionComponent, {
        data: `¿Desea eliminar el elemento?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.eliminarHabilidad(habilidad);
        }});
  }









  //------------------------------------------------
  //--------------MOVER ELEMENTOS-------------------
  //------------------------------------------------

  drop(event: CdkDragDrop<Habilidad[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
    this.actualizarIndices(0);
  }

  //------Para el cambio de posicion debido al movimiento -----------------
  actualizarIndices(desde: number) {
    for (let i = desde; i < this.habilidades.length; i++) {
      this.habilidades[i].posicion = i;
      this.habilidadService.guaradarHabilidad(this.habilidades[i]).subscribe(data => {

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
      this.habilidadFormulario.imagen = imagen.base;
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
