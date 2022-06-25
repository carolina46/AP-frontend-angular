import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { EdicionPortfolioComponent } from './componentes/edicion-portfolio/edicion-portfolio.component';

const routes: Routes = [
{path: '', component: PortfolioComponent },
{path: 'iniciarSesion', component: IniciarSesionComponent},
{path: 'edicionPortfolio', component: EdicionPortfolioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
