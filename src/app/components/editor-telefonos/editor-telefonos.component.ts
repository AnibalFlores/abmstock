import { Component, OnInit } from '@angular/core';
import { Telefono } from 'src/app/classes/telefono';
import { FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editor-telefonos',
  templateUrl: './editor-telefonos.component.html',
  styleUrls: ['./editor-telefonos.component.css']
})
export class EditorTelefonosComponent implements OnInit {
  tel: Telefono;
  titulo = '';
  nuevo = false;
  nuevoprov = false;
  nuevocli = false;
  enviado = false;
  Id = 0;
  path: UrlSegment;

    constructor(
    private location: Location,
    private fb: FormBuilder,
    private dataSrv: DataService,
    private ruta: ActivatedRoute,
    private router: Router,
    private authSrv: AuthService) { }

  ngOnInit() {
    this.nuevoprov = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 2].toString() === 'nuevo-telproveedor';
    this.nuevocli = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 2].toString() === 'nuevo-telcliente' ;
    this.nuevo = this.nuevoprov || this.nuevocli;
    if (this.nuevo) {
      this.tel = new Telefono();
      this.tel.id = -1;
      this.tel.contacto = '';
      this.Id = +this.ruta.snapshot.paramMap.get('id'); // resguardamos id del proveedor o cliente
      this.titulo = 'Nuevo Telefono';
    } else {
      this.dataSrv.getTelefono(+this.ruta.snapshot.paramMap.get('id')).subscribe(
        (t: Telefono) => {
          this.tel = t;
        },
        error => console.log(error));
      this.titulo = 'Editar Telefono';
    }
  }

  cancelar() {
    this.location.back(); // <-- volver pagina anterior
  }

  confirmado() {
    this.enviado = true;
    if (this.tel.id !== -1) {
      this.guardarTelefono(); // put
    } else {
      this.nuevoTelefono(); // post
    }

  }

  private guardarTelefono() {
    this.dataSrv.putTelefono(this.tel).subscribe(
      (a) => this.cancelar(), // volvemos al listado de proveedores
      error => {
        alert('Error al guardar el telefono: ' + error);
        this.enviado = true;
      }
    );
  }

  private nuevoTelefono() {
    this.tel.id = null; // ponemos el -1 en null para que no explote
    this.dataSrv.newTelefono(this.tel).subscribe(
      // aca con el id del nuevo telefono lo asociamos al proveedor
      (nuevotel) => {
        if (this.nuevoprov) {this.dataSrv.asociarTelefonoProveedor(nuevotel.id, this.Id).subscribe(); }
        if (this.nuevocli) {this.dataSrv.asociarTelefonoCliente(nuevotel.id, this.Id).subscribe(); }
        this.cancelar(); } , // volvemos al listado de proveedores
      // (a) => this.router.navigate(['/listatelefonos']),
      error => {
        alert('Error al guardar el telefono: ' + error);
        this.enviado = true;
      }
    );
  }

}
