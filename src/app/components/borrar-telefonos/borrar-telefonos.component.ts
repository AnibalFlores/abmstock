import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Telefono } from 'src/app/classes/telefono';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-borrar-telefonos',
  templateUrl: './borrar-telefonos.component.html',
  styleUrls: ['./borrar-telefonos.component.css']
})
export class BorrarTelefonosComponent implements OnInit {

  tel: Telefono;
  titulo = '';
  telefonodefault;

  constructor(
    private location: Location,
    private dataSrv: DataService,
    private ruta: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.dataSrv.getTelefono(+this.ruta.snapshot.paramMap.get('id')).subscribe(
      (t: Telefono) => {
        this.tel = t;
      },
      error => console.log(error));

      this.dataSrv.getTelefono(1).subscribe(
        (t: Telefono) => {
          this.telefonodefault = t.numero;
        },
        error => console.log(error));
    this.titulo = 'Borrar Telefono';
  }

  cancelar() {
    this.location.back(); // <-- volver pagina anterior
  }

  borrar() {
    this.dataSrv.delTelefono(this.tel.id).subscribe(count => {
      alert('Telefonos borrados ' + count);
      this.cancelar();
      // this.router.navigate(['/listatelefonos']);
    });
  }

}
