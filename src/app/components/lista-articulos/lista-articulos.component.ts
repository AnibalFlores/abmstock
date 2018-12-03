import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/app/services/data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.component.html',
  styleUrls: ['./lista-articulos.component.css']
})
export class ListaArticulosComponent implements OnInit {
  articulos: any;
  titulo = 'Articulos';
  vendedor = false;

  constructor(private authSrv: AuthService, private dataSrv: DataService) { }

  ngOnInit() {
    this.dataSrv.getArticulos().subscribe(articulos => {
      this.articulos = articulos;
    });
    this.vendedor = this.authSrv.isVenta();
  }

}
