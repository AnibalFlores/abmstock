import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/classes/articulo';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-lista-articulos',
  templateUrl: './lista-articulos.component.html',
  styleUrls: ['./lista-articulos.component.css']
})
export class ListaArticulosComponent implements OnInit {
  articulos: any;

  constructor(private dataSrv: DataService, private router: Router) { }

  ngOnInit()  {
  this.dataSrv.getArticulos().subscribe(articulos => {
    this.articulos = articulos; });
  }

}
