import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  form: FormGroup;

  private nombreUsuario: string = '';
  private contraseña: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.form = this.formBuilder.group(
      {
        nombreUsuario: ['', Validators.required],
        contraseña: ['', Validators.required]

      }
    )
  }

  ngOnInit(): void {
  }

  get Nombre() { return this.form.get('nombre') }
  get Contraseña() { return this.form.get('contraseña') }

  /*Login() {
    this.authService.login(this.nombreUsuario, this.contraseña);
  }*/




  



}
