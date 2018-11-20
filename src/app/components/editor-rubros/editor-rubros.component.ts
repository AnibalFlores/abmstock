import { Component, OnInit } from '@angular/core';
import { Rubro } from 'src/app/classes/rubro';
import { FormBuilder } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editor-rubros',
  templateUrl: './editor-rubros.component.html',
  styleUrls: ['./editor-rubros.component.css']
})
export class EditorRubrosComponent implements OnInit {
  rub: Rubro;
  titulo = '';
  nuevo = false;
  enviado = false;

  constructor(
    private fb: FormBuilder,
    private dataSrv: DataService,
    private ruta: ActivatedRoute,
    private router: Router,
    private authSrv: AuthService) { }

  ngOnInit() {
    this.nuevo = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 1].toString() === 'nuevo-rubro';
    if (this.nuevo) {
      this.rub = new Rubro();
      this.rub.id = -1;
      this.rub.nombre = '';
      this.titulo = 'Nuevo Rubro';
    } else {
      this.dataSrv.getRubro(+this.ruta.snapshot.paramMap.get('id')).subscribe(
        (r: Rubro) => {
          this.rub = r;
        },
        error => console.log(error));
      this.titulo = 'Editar Rubro';
    }
  }

   // segun estemos editando o agregando hacemos put o post
   confirmado() {
    this.enviado = true;
    if (this.rub.id !== -1) {
      this.guardarRubro(); // put
    } else {
      this.nuevoRubro(); // post
    }

  }

  private guardarRubro() {
    this.dataSrv.putRubro(this.rub).subscribe(
      (a) => this.router.navigate(['/listarubros']),
      error => {
        alert('Error al guardar el rubro: ' + error);
        this.enviado = true;
      }
    );
  }

  private nuevoRubro() {
    this.rub.id = null; // ponemos el -1 en null para que no explote
    this.dataSrv.newRubro(this.rub).subscribe(
      (a) => this.router.navigate(['/listarubros']),
      error => {
        alert('Error al guardar el rubro: ' + error);
        this.enviado = true;
      }
    );
  }

}
