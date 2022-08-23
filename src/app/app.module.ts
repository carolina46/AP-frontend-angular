import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './componentes/mostrarPortfolio/menu/menu.component';
import { AcercaDeComponent } from './componentes/mostrarPortfolio/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './componentes/mostrarPortfolio/experiencia/experiencia.component';
import { EducacionComponent } from './componentes/mostrarPortfolio/educacion/educacion.component';
import { HabilidadesComponent } from './componentes/mostrarPortfolio/habilidades/habilidades.component';
import { ProyectosComponent } from './componentes/mostrarPortfolio/proyectos/proyectos.component';
import { IniciarSesionComponent } from './componentes/autenticacion/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './componentes/mostrarPortfolio/portfolio/portfolio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EdicionPortfolioComponent } from './componentes/editarPortfolio/edicion-portfolio/edicion-portfolio.component';
import { EdicionAcercaDeComponent } from './componentes/editarPortfolio/edicion-acerca-de/edicion-acerca-de.component';
import { EdicionExterienciaComponent } from './componentes/editarPortfolio/edicion-exteriencia/edicion-exteriencia.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { VentanaConfirmacionComponent } from './componentes/editarPortfolio/ventana-confirmacion/ventana-confirmacion.component';
import { EdicionEducacionComponent } from './componentes/editarPortfolio/edicion-educacion/edicion-educacion.component';
import { EdicionHabilidadComponent } from './componentes/editarPortfolio/edicion-habilidad/edicion-habilidad.component';
import { EdicionProyectoComponent } from './componentes/editarPortfolio/edicion-proyecto/edicion-proyecto.component';
import { EdicionRedesComponent } from './componentes/editarPortfolio/edicion-redes/edicion-redes.component' ;
import { interceptorProvider } from './interceptors/prod-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    HabilidadesComponent,
    ProyectosComponent,
    IniciarSesionComponent,
    PortfolioComponent,
    EdicionPortfolioComponent,
    EdicionAcercaDeComponent,
    EdicionExterienciaComponent,
    VentanaConfirmacionComponent,
    EdicionEducacionComponent,
    EdicionHabilidadComponent,
    EdicionProyectoComponent,
    EdicionRedesComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    MatDialogModule,
    MatButtonModule,
  ],
  entryComponents: [VentanaConfirmacionComponent],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
