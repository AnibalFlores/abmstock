import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.css']
})
export class ListaProveedoresComponent implements OnInit {

  proveedores: any;
  titulo = 'Proveedores';
  admin = false;

  constructor(private dataSrv: DataService, private authSrv: AuthService) { }

  ngOnInit() {
    this.dataSrv.getProveedores().subscribe(proveedores => {
      this.proveedores = proveedores;
    });
    this.admin = this.authSrv.isAdmin();
  }

}
