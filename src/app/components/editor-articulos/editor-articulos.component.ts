import { Component, OnInit } from '@angular/core';
import { Articulo } from 'src/app/classes/articulo';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Rubro } from 'src/app/classes/rubro';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editor-articulos',
  templateUrl: './editor-articulos.component.html',
  styleUrls: ['./editor-articulos.component.css']
})
export class EditorArticulosComponent implements OnInit {
  articuloForm = new FormGroup({ rubroControl: new FormControl()});
  art: Articulo;
  nuevo = false;
  titulo = '';
  rubros: Rubro[];

  constructor(
    private fb: FormBuilder,
    private dataSrv: DataService,
    private ruta: ActivatedRoute,
    private router: Router, private authSrv: AuthService) {

      this.dataSrv.getRubros().subscribe((r: Rubro[]) => {
        this.rubros = r;
      });
     }

  confirmado() {

  }

  ngOnInit() {
    this.nuevo = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 1].toString() === 'nuevo-articulo';
    if (this.nuevo) {
      this.art = new Articulo();
      this.titulo = 'Nuevo Articulo';
    } else {
      this.dataSrv.getArticulo(+this.ruta.snapshot.paramMap.get('id')).subscribe(
        (a: Articulo) => {
          this.art = a;
          this.articuloForm = this.fb.group({
            rubroControl: [a.rubro]
          });
        },
        error => console.log(error));
      this.titulo = 'Editar Articulo';
    }
  }

  guardarArticulo() {
    this.dataSrv.putArticulo(this.art).subscribe(
      (a) => this.router.navigate(['/']),
      error => alert('Error al guardar el artículo: ' + error)
    );
}

}


