import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  clientes: any;
  titulo = 'Clientes';

  constructor(private dataSrv: DataService, private router: Router) { }

  ngOnInit()  {
  this.dataSrv.getClientes().subscribe(clientes => {
    this.clientes = clientes; });
  }

}
