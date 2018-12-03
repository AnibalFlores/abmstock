import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/classes/cliente';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-editor-clientes',
  templateUrl: './editor-clientes.component.html',
  styleUrls: ['./editor-clientes.component.css']
})
export class EditorClientesComponent implements OnInit {

  clienteForm = new FormGroup({ ivaControl: new FormControl() });
  cli: Cliente;
  nuevo = false;
  titulo = '';
  enviado = false;
  admin = false;
  cate = [{ nombre: 'Responsable Inscripto'}, {nombre: 'Consumidor Final'}, {nombre: 'Monotributista'}, { nombre: 'Exento'}];

  constructor(
    private fb: FormBuilder,
    private dataSrv: DataService,
    private ruta: ActivatedRoute,
    private router: Router, private authSrv: AuthService) { }

  ngOnInit() {
    this.nuevo = this.ruta.snapshot.url[this.ruta.snapshot.url.length - 1].toString() === 'nuevo-cliente';
    if (this.nuevo) {
      this.cli = new Cliente();
      this.cli.id = -1;
      this.cli.razonsocial = '';
      this.cli.cuit = '00-00000000-0';
      this.cli.condicioniva = 'Responsable Inscripto';
      this.titulo = 'Nuevo Cliente';
      // Fijamos condicion de iva en RI
      this.clienteForm.controls['ivaControl'].setValue('Responsable Inscripto');
    } else {
      this.dataSrv.getCliente(+this.ruta.snapshot.paramMap.get('id')).subscribe(
        (c) => {
          this.cli = c;
          this.clienteForm.controls['ivaControl'].setValue(c.condicioniva);
          // console.log(this.pro.telefonos);
        },
        error => console.log(error));
      this.titulo = 'Editar Cliente';
      this.admin = this.authSrv.isAdmin();
    }
  }

  // segun estemos editando o agregando hacemos put o post
  confirmado() {
    this.enviado = true;
    // Aplicamos la condicion de iva seleccionada
    const iva = this.clienteForm.controls['ivaControl'].value;
    this.cli.condicioniva = iva;

    if (this.cli.id !== -1) {
      this.guardarCliente(); // put
    } else {
      this.nuevoCliente(); // post
    }

  }

  private guardarCliente() {
    this.dataSrv.putCliente(this.cli).subscribe(
      (a) => this.router.navigate(['/listaclientes']),
      error => {
        alert('Error al guardar el cliente: ' + error);
        this.enviado = true;
      }
    );
  }

  private nuevoCliente() {
    this.cli.id = null; // ponemos el -1 en null para que no explote
    this.dataSrv.newCliente(this.cli).subscribe(
      (a) => this.router.navigate(['/listaclientes']),
      error => {
        alert('Error al guardar el cliente: ' + error);
        this.enviado = true;
      }
    );
  }

}
