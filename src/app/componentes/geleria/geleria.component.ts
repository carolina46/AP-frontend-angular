import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Proyecto } from 'src/app/modelo/proyecto';

@Component({
  selector: 'app-geleria',
  templateUrl: './geleria.component.html',
  styleUrls: ['./geleria.component.css']
})
export class GeleriaComponent implements OnInit {

  constructor(public dialogo: MatDialogRef<GeleriaComponent>,
    @Inject(MAT_DIALOG_DATA) public proyecto: Proyecto) { }

    cerrarDialogo(): void {
      this.dialogo.close(false);
    }
    
  ngOnInit(): void {
  }

}
