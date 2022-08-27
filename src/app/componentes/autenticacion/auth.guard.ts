import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router  } from '@angular/router';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { TokenService } from 'src/app/servicios/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  realRol: string = 'user';

  constructor(private tokenService: TokenService, 
    private router: Router,
    private notificacionesService: NotificacionesService) {}

  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol'];
    const roles = this.tokenService.getAuthorities();
    this.realRol = 'user';
    roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.realRol = 'admin';
      }
    });
    if (!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1) {
      
      this.router.navigate(['/iniciarSesion']);
      this.notificacionesService.showWarning("Debe Iniciar Seción","")
      return false;
    }
    return true;
  }
}
