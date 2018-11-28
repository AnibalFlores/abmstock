import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/classes/articulo';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Rubro } from 'src/app/classes/rubro';
import { FormGroup, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor-articulos',
  templateUrl: './editor-articulos.component.html',
  styleUrls: ['./editor-articulos.component.css']
})
export class EditorArticulosComponent implements OnInit {
  articuloForm = new FormGroup({ rubroControl: new FormControl() });
  art: Articulo;
  nuevo = false;
  titulo = '';
  rubros: Rubro[];
  enviado = false;
  admin = true;

  constructor(
    private fb: FormBuilder,
    private dataSrv: DataService,
    private ruta: ActivatedRoute,
    private router: Router, private authSrv: AuthService) {

    this.dataSrv.getRubros().subscribe((r: Rubro[]) => {
      this.rubros = r;
    });
  }

  ngOnInit() {
    this.admin = !this.authSrv.isAdmin();
    this.nuevo = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 1].toString() === 'nuevo-articulo';
    if (this.nuevo) {
      this.art = new Articulo();
      this.art.id = -1;
      this.art.cantidad = 0; // solo el admin puede editar la cantidad sin facturas
      this.art.codigo = 'N01';
      this.art.nombre = 'Sin nombre';
      this.art.descripcion = 'Sin descripcion';
      this.art.preciocompra = 10; // solo el admin puede editar precio de costo sin facturas
      this.art.precioventa = 20; // solo el admin puede editar precio de venta sin facturas
      // this.art.rubro.id = 1;
      this.articuloForm.controls['rubroControl'].setValue(1); // pongamos rubro 1 = Varios
      // console.log(this.art);
      this.titulo = 'Nuevo Articulo';
    } else {
      this.dataSrv.getArticulo(+this.ruta.snapshot.paramMap.get('id')).subscribe(
        (a: Articulo) => {
          this.art = a;
          this.articuloForm.controls['rubroControl'].setValue(this.art.rubro.id);
        },
        error => console.log(error));
      this.titulo = 'Editar Articulo';
    }
  }

  // segun estemos editando o agregando hacemos put o post
  confirmado() {
    this.enviado = true;
    const i = this.articuloForm.controls['rubroControl'].value;
    this.art.rubro = this.rubros.find(r => r.id === i);
    if (this.art.id !== -1) {
      this.guardarArticulo(); // put
    } else {
      this.nuevoArticulo(); // post
    }

  }

  private guardarArticulo() {
    this.dataSrv.putArticulo(this.art).subscribe(
      (a) => this.router.navigate(['/listaarticulos']),
      error => {
        alert('Error al guardar el artículo: ' + error);
        this.enviado = true;
      }
    );
  }

  private nuevoArticulo() {
    this.art.id = null; // ponemos el -1 en null para que no explote
    this.dataSrv.newArticulo(this.art).subscribe(
      (a) => this.router.navigate(['/listaarticulos']),
      error => {
        alert('Error al guardar el artículo: ' + error);
        this.enviado = true;
      }
    );
  }

}


