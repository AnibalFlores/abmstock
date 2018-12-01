import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Cliente } from 'src/app/classes/cliente';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-borrar-clientes',
  templateUrl: './borrar-clientes.component.html',
  styleUrls: ['./borrar-clientes.component.css']
})
export class BorrarClientesComponent implements OnInit {
  clie: Cliente;
  titulo = '';

  constructor(
    private dataSrv: DataService,
    private ruta: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.dataSrv.getCliente(+this.ruta.snapshot.paramMap.get('id')).subscribe(
      (c: Cliente) => {
        this.clie = c;
      },
      error => console.log(error));
    this.titulo = 'Borrar Cliente';
  }

  borrar() {
    this.dataSrv.delCliente(this.clie.id).subscribe(count => {
      alert('Clientes borrados ' + count);
      this.router.navigate(['/listaclientes']);
    });
  }

}
