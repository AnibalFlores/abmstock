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

const routes: Routes = [
  // Ingreso
  { path: 'login', component: LoginUserComponent },
  // Articulos
  { path: 'listaarticulos', component: ListaArticulosComponent },
  { path: 'editar-articulo/:id', component: EditorArticulosComponent },
  { path: 'nuevo-articulo', component: EditorArticulosComponent },
  { path: 'borrar-articulo/:id', component: BorrarArticulosComponent },
  // Rubros
  { path: 'listarubros', component: ListaRubrosComponent },
  { path: 'editar-rubro/:id', component: EditorRubrosComponent },
  { path: 'nuevo-rubro', component: EditorRubrosComponent },
  { path: 'borrar-rubro/:id', component: BorrarRubrosComponent },
   // Proveedores
   { path: 'listaproveedores', component: ListaProveedoresComponent },
   { path: 'editar-proveedor/:id', component: EditorProveedoresComponent },
   { path: 'nuevo-proveedor', component: EditorProveedoresComponent },
   { path: 'borrar-proveedor/:id', component: BorrarProveedoresComponent },
  // Default
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
