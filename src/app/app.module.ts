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

@NgModule({
  declarations: [
    AppComponent,
    LoginUserComponent,
    ListaArticulosComponent,
    NavbarComponent,
    EditorArticulosComponent
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
