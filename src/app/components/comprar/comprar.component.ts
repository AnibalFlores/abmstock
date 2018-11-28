// https://blog.angularindepth.com/building-interactive-lists-with-the-new-angular-7-drag-and-drop-tool-5f2402f8cb27
// https://material.angular.io/cdk/drag-drop/overview

import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DataService } from 'src/app/services/data.service';
import { Articulo } from 'src/app/classes/articulo';
import { Proveedor } from 'src/app/classes/proveedor';
import { FormGroup, FormControl } from '@angular/forms';
import { Itemcompra } from 'src/app/classes/itemcompra';
import { Facturacompra } from 'src/app/classes/facturacompra';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.component.html',
  styleUrls: ['./comprar.component.css']
})
export class ComprarComponent implements OnInit {
  compraForm = new FormGroup({ proveedorControl: new FormControl() });
  // itemsForm = new FormGroup({ ivaControl: new FormControl() });
  titulo = 'Factura Compras';
  factura = new Facturacompra();
  proveedores: Proveedor[] = [];
  articulos: Articulo[] = [];
  stockActual: Articulo[] = [];
  items: Itemcompra[] = [];
  seleccion = true;
  prov: Proveedor;
  enviado = false;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    } else {
      moveItemInArray(this.articulos, event.previousIndex, event.currentIndex);
    }
  }

  constructor(private dataSrv: DataService, private router: Router) {
    this.factura.tipo = 'A';
    this.factura.fecha = this.currentDate();
    this.factura.sucursal = 0;
    this.factura.numero = 0;
  }

  private currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0, 10);
  }

  siguiente() {
    if (this.compraForm.controls['proveedorControl'].value !== null && this.articulos.length !== 0) {
      // console.log(this.compraForm.controls['proveedorControl'].value);
      this.prov = this.proveedores.find(p => p.id === this.compraForm.controls['proveedorControl'].value);
      this.cargarItems();
      this.seleccion = false;
    } else {
      console.log(this.compraForm.controls['proveedorControl'].value);
      console.log(this.articulos.length);
    }
  }

  cambioTipo() {
    // console.log(this.factura.tipo);
    this.calculaFactura();

  }

  cambio(i: number) {

    const it = this.items[i];
    if (this.factura.tipo === 'A') {
      it.subtotal = it.cantidad * it.preciounitario;
    } else {
      it.subtotal = it.cantidad * it.preciounitario * (1 + (it.iva / 100));
    }
    this.calculaFactura();
  }

  private cargarItems() {
    for (let i = 0; i < this.articulos.length; i++) {
      const item = new Itemcompra();
      item.idarticulo = this.articulos[i].id;
      item.renglon = i;
      item.codigoproducto = this.articulos[i].codigo;
      item.descripcion = this.articulos[i].nombre;
      item.cantidad = 1;
      item.preciounitario = +this.articulos[i].preciocompra;
      item.iva = 21; // por defecto aplicamos 21%
      item.subtotal = item.preciounitario * 1.21;
      this.items.push(item);
    }
    this.calculaFactura();
  }

  Confirmar() {
    // this.factura.items = [];
    // for (let i = 0; i < this.items.length; i++) {
    //  this.factura.items.push(this.items[i]);
    // }
    this.enviado = true;
    this.factura.items = this.items;
    this.prov.facturas = [this.factura];
    this.dataSrv.newFacturaProveedor(this.prov).subscribe(result => {
      alert(result);
    this.router.navigate(['/listaproveedores']);
   });
    // console.log(JSON.stringify(this.prov));
  }

  Cancelar() {
    this.seleccion = true;
    this.articulos = [];
    this.items = [];
    this.ngOnInit();
    console.log('cancelado...');

  }

  ngOnInit() {
    this.dataSrv.getArticulos().subscribe((a: Articulo[]) => this.stockActual = a);
    this.dataSrv.getProveedores().subscribe((p: Proveedor[]) => this.proveedores = p);
  }

  private calculaFactura() {
    // ponemos a cero todo
    this.factura.subtotaliva = 0;
    this.factura.total = 0;
    this.factura.iva21 = 0;
    this.factura.iva10 = 0;

    if (this.factura.tipo === 'A') {
      // calculo con iva
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].subtotal = this.items[i].cantidad * this.items[i].preciounitario;
        if (this.items[i].iva >= 20) {
          this.factura.iva21 += this.items[i].subtotal * 0.21;
        } else {
          this.factura.iva10 += this.items[i].subtotal * 0.105;
        }
        this.factura.total += this.items[i].subtotal;

      }
      this.factura.subtotaliva += this.factura.iva21 + this.factura.iva10;
      this.factura.total += this.factura.subtotaliva;
    } else {
      // calculo sin iva
      for (let i = 0; i < this.items.length; i++) {
        this.items[i].subtotal = this.items[i].cantidad * this.items[i].preciounitario * (1 + (this.items[i].iva / 100));
        this.factura.total += this.items[i].subtotal;

      }
    }
  }
}
