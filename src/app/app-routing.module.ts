import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginUserComponent } from './components/login-user/login-user.component';
import { ListaArticulosComponent } from './components/lista-articulos/lista-articulos.component';
import { EditorArticulosComponent } from './components/editor-articulos/editor-articulos.component';
import { BorrarArticulosComponent } from './components/borrar-articulos/borrar-articulos.component';
import { ListaRubrosComponent } from './components/lista-rubros/lista-rubros.component';
import { EditorRubrosComponent } from './components/editor-rubros/editor-rubros.component';
import { BorrarRubrosComponent } from './components/borrar-rubros/borrar-rubros.component';
import { ListaProveedoresComponent } from './components/lista-proveedores/lista-proveedores.component';
import { EditorProveedoresComponent } from './components/editor-proveedores/editor-proveedores.component';
import { BorrarProveedoresComponent } from './components/borrar-proveedores/borrar-proveedores.component';
import { ListaTelefonosComponent } from './components/lista-telefonos/lista-telefonos.component';
import { EditorTelefonosComponent } from './components/editor-telefonos/editor-telefonos.component';
import { BorrarTelefonosComponent } from './components/borrar-telefonos/borrar-telefonos.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { EditorClientesComponent } from './components/editor-clientes/editor-clientes.component';
import { BorrarClientesComponent } from './components/borrar-clientes/borrar-clientes.component';
import { ComprarComponent } from './components/comprar/comprar.component';
import { VenderComponent } from './components/vender/vender.component';
import { LoggedGuard } from './services/logged.guard';
import { ComprasGuard } from './services/compras.guard';
import { VentasGuard } from './services/ventas.guard';
import { VerFacturacompraComponent } from './components/ver-facturacompra/ver-facturacompra.component';
import { ListaFacturacompraComponent } from './components/lista-facturacompra/lista-facturacompra.component';
import { ListaFacturaventaComponent } from './components/lista-facturaventa/lista-facturaventa.component';
import { VerFacturaventaComponent } from './components/ver-facturaventa/ver-facturaventa.component';

const routes: Routes = [
  // Ingreso
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginUserComponent },
  // Articulos
  { path: 'listaarticulos', component: ListaArticulosComponent, canActivate: [LoggedGuard] },
  { path: 'editar-articulo/:id', component: EditorArticulosComponent, canActivate: [LoggedGuard] },
  { path: 'nuevo-articulo', component: EditorArticulosComponent, canActivate: [LoggedGuard] },
  { path: 'borrar-articulo/:id', component: BorrarArticulosComponent, canActivate: [ComprasGuard] },
  // Rubros
  { path: 'listarubros', component: ListaRubrosComponent, canActivate: [ComprasGuard] },
  { path: 'editar-rubro/:id', component: EditorRubrosComponent, canActivate: [ComprasGuard] },
  { path: 'nuevo-rubro', component: EditorRubrosComponent, canActivate: [ComprasGuard] },
  { path: 'borrar-rubro/:id', component: BorrarRubrosComponent, canActivate: [ComprasGuard] },
  // Proveedores
  { path: 'listaproveedores', component: ListaProveedoresComponent, canActivate: [ComprasGuard] },
  { path: 'editar-proveedor/:id', component: EditorProveedoresComponent, canActivate: [ComprasGuard] },
  { path: 'nuevo-proveedor', component: EditorProveedoresComponent, canActivate: [ComprasGuard] },
  { path: 'borrar-proveedor/:id', component: BorrarProveedoresComponent, canActivate: [ComprasGuard] },
  // Clientes
  { path: 'listaclientes', component: ListaClientesComponent, canActivate: [VentasGuard] },
  { path: 'editar-cliente/:id', component: EditorClientesComponent, canActivate: [VentasGuard] },
  { path: 'nuevo-cliente', component: EditorClientesComponent, canActivate: [VentasGuard] },
  { path: 'borrar-cliente/:id', component: BorrarClientesComponent, canActivate: [VentasGuard] },
  // Telefonos
  { path: 'listatelefonos', component: ListaTelefonosComponent, canActivate: [LoggedGuard] },
  { path: 'editar-telefono/:id', component: EditorTelefonosComponent, canActivate: [LoggedGuard] },
  { path: 'nuevo-telproveedor/:id', component: EditorTelefonosComponent, canActivate: [LoggedGuard] },
  { path: 'nuevo-telcliente/:id', component: EditorTelefonosComponent, canActivate: [LoggedGuard] },
  { path: 'borrar-telefono/:id', component: BorrarTelefonosComponent, canActivate: [LoggedGuard] },
  // Compras
  { path: 'compras', component: ComprarComponent, canActivate: [ComprasGuard] },
  // Ventas
  { path: 'ventas', component: VenderComponent, canActivate: [VentasGuard] },
  // Listados
  { path: 'listafacturacompra', component: ListaFacturacompraComponent, canActivate: [ComprasGuard] },
  { path: 'listafacturaventa', component: ListaFacturaventaComponent, canActivate: [VentasGuard] },
  { path: 'verfacturacompra/:id', component: VerFacturacompraComponent }, // para que con el qr se pueda ver la factura
  { path: 'verfacturaventa/:id', component: VerFacturaventaComponent }, // sin estar logueado no tienen canActivate
  // Default
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
