import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Proveedor } from 'src/app/classes/proveedor';

@Component({
  selector: 'app-editor-proveedores',
  templateUrl: './editor-proveedores.component.html',
  styleUrls: ['./editor-proveedores.component.css']
})
export class EditorProveedoresComponent implements OnInit {

  proveedorForm = new FormGroup({ rubroControl: new FormControl() });
  pro: Proveedor;
  nuevo = false;
  titulo = '';
  enviado = false;

  constructor(
    private fb: FormBuilder,
    private dataSrv: DataService,
    private ruta: ActivatedRoute,
    private router: Router, private authSrv: AuthService) { }

  ngOnInit() {
    this.nuevo = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 1].toString() === 'nuevo-proveedor';
    if (this.nuevo) {
      this.pro = new Proveedor();
      this.pro.id = -1;
      this.pro.razonsocial = '';
      this.pro.cuit = '00-00000000-0';
      this.pro.condicioniva = 'Responsable Inscripto';
      this.titulo = 'Nuevo Proveedor';
    } else {
      this.dataSrv.getProveedor(+this.ruta.snapshot.paramMap.get('id')).subscribe(
        (p: Proveedor) => {
          this.pro = p;
        },
        error => console.log(error));
      this.titulo = 'Editar Articulo';
    }
  }

  // segun estemos editando o agregando hacemos put o post
  confirmado() {
    this.enviado = true;
    if (this.pro.id !== -1) {
      this.guardarProveedor(); // put
    } else {
      this.nuevoProveedor(); // post
    }

  }

  private guardarProveedor() {
    this.dataSrv.putProveedor(this.pro).subscribe(
      (a) => this.router.navigate(['/listaproveedores']),
      error => {
        alert('Error al guardar el proveedor: ' + error);
        this.enviado = true;
      }
    );
  }

  private nuevoProveedor() {
    this.pro.id = null; // ponemos el -1 en null para que no explote
    this.dataSrv.newProveedor(this.pro).subscribe(
      (a) => this.router.navigate(['/listaproveedores']),
      error => {
        alert('Error al crear el nuevo proveedor: ' + error);
        this.enviado = true;
      }
    );
  }

}

