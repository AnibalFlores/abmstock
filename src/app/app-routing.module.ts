import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { ListaArticulosComponent } from './components/lista-articulos/lista-articulos.component';
import { EditorArticulosComponent } from './components/editor-articulos/editor-articulos.component';

const routes: Routes = [
  { path: 'login', component: LoginUserComponent },
  // {path:'ListaPeliculas',component:ListarPeliculasComponent},
  // {path:'registerMovie',component:AltaPeliculaComponent},
  // {path:'deleteMovie',component:BajaPeliculaComponent},
  // {path:'modifMovie',component:ModifPeliculaComponent},
  // {path:'registerUser',component:AltaUserComponent},
  // {path:'deleteUser',component:BajaUserComponent},
  { path: 'editar-articulo/:id', component: EditorArticulosComponent },
  { path: 'listaarticulos', component: ListaArticulosComponent },
  // {path:'detailMovie',component:DetallePeliculaComponent},
  // {path:'editarTarea/:id',component:FormTareaComponent},
  // {path:'',redirectTo:'tareas',pathMatch:'full'},
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
