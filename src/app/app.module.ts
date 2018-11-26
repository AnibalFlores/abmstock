import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaArticulosComponent } from './components/lista-articulos/lista-articulos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditorArticulosComponent } from './components/editor-articulos/editor-articulos.component';
import { BorrarArticulosComponent } from './components/borrar-articulos/borrar-articulos.component';
import { ListaRubrosComponent } from './components/lista-rubros/lista-rubros.component';
import { EditorRubrosComponent } from './components/editor-rubros/editor-rubros.component';
import { BorrarRubrosComponent } from './components/borrar-rubros/borrar-rubros.component';
import { ListaProveedoresComponent } from './components/lista-proveedores/lista-proveedores.component';
import { EditorProveedoresComponent } from './components/editor-proveedores/editor-proveedores.component';
import { BorrarProveedoresComponent } from './components/borrar-proveedores/borrar-proveedores.component';
import { EditorTelefonosComponent } from './components/editor-telefonos/editor-telefonos.component';
import { BorrarTelefonosComponent } from './components/borrar-telefonos/borrar-telefonos.component';
import { ListaTelefonosComponent } from './components/lista-telefonos/lista-telefonos.component';
import { ListaClientesComponent } from './components/lista-clientes/lista-clientes.component';
import { EditorClientesComponent } from './components/editor-clientes/editor-clientes.component';
import { BorrarClientesComponent } from './components/borrar-clientes/borrar-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    ListaArticulosComponent,
    NavbarComponent,
    EditorArticulosComponent,
    BorrarArticulosComponent,
    ListaRubrosComponent,
    EditorRubrosComponent,
    BorrarRubrosComponent,
    ListaProveedoresComponent,
    EditorProveedoresComponent,
    BorrarProveedoresComponent,
    EditorTelefonosComponent,
    BorrarTelefonosComponent,
    ListaTelefonosComponent,
    ListaClientesComponent,
    EditorClientesComponent,
    BorrarClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
