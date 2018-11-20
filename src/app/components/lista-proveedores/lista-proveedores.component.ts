import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.css']
})
export class ListaProveedoresComponent implements OnInit {

  proveedores: any;

  constructor(private dataSrv: DataService, private router: Router) { }

  ngOnInit()  {
  this.dataSrv.getProveedores().subscribe(articulos => {
    this.proveedores = articulos; });
  }

}
