import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  clientes: any;
  titulo = 'Clientes';
  admin = false;

  constructor(private dataSrv: DataService, private authSrv: AuthService) { }

  ngOnInit() {
    this.dataSrv.getClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
    this.admin = this.authSrv.isAdmin();
  }

}
