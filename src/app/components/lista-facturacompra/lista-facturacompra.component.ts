import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Proveedor } from 'src/app/classes/proveedor';
import { Facturacompra } from 'src/app/classes/facturacompra';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-lista-facturacompra',
  templateUrl: './lista-facturacompra.component.html',
  styleUrls: ['./lista-facturacompra.component.css']
})

export class ListaFacturacompraComponent implements OnInit {
  listacompraForm = new FormGroup({ proveedorControl: new FormControl() });
  titulo = 'Listado Facturas Compras';
  proveedores: Proveedor[];
  facturas: Facturacompra[] = [];
  poolfacturas: Facturacompra[];
  prov: Proveedor;

  constructor(private dataSrv: DataService) { }

  cambiaProveedor() {
    const id = this.listacompraForm.controls['proveedorControl'].value;
    if (id !== 0) {
      this.facturas = this.poolfacturas.filter(function (factura) {
        return factura.proveedorId === id;
      });
    } else {
      this.facturas = this.poolfacturas;
    }
  }

  ngOnInit() {
    this.dataSrv.getProveedores().subscribe((p: Proveedor[]) => this.proveedores = p);
    this.dataSrv.getFacturasCompras().subscribe(
      (f: Facturacompra[]) => {
        this.poolfacturas = f;
        this.facturas = f;
      });
    this.listacompraForm.controls['proveedorControl'].setValue(0);
  }

}
