import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './componentes/autenticacion/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './componentes/mostrarPortfolio/portfolio/portfolio.component';
import { EdicionPortfolioComponent } from './componentes/editarPortfolio/edicion-portfolio/edicion-portfolio.component';
import { AuthGuard } from './componentes/autenticacion/auth.guard';

const routes: Routes = [
{path: '', component: PortfolioComponent },
{path: 'iniciarSesion', component: IniciarSesionComponent},
{path: 'edicionPortfolio', component: EdicionPortfolioComponent, canActivate: [AuthGuard], data: { expectedRol: ['admin'] } },
{ path: '**', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
