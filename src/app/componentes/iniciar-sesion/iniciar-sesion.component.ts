import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
form:FormGroup;

  constructor(private formBuilder:FormBuilder) { 
    this.form = this.formBuilder.group(
      {
        nombre:['', Validators.required],
        contraseña:['', Validators.required]

    }
    )
  }

  ngOnInit(): void {
  }

  get Nombre(){return this.form.get('nombre')}
  get Contraseña(){return this.form.get('contraseña')}

}
