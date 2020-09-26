import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AbmProductosComponent } from './page/abm-productos/abm-productos.component';
import { AbmCategoriasComponent } from './page/abm-categorias/abm-categorias.component';
import { VentasComponent } from './page/ventas/ventas.component';
import { AuthGuard } from './auth.guard';
import { ModificacionProductoComponent} from './page/abm-productos/modificacion-producto/modificacion-producto/modificacion-producto.component'
import { BajaProductoComponent} from './page/abm-productos/baja-producto/baja-producto/baja-producto.component'
import { ModificacionCategoriaComponent} from './page/abm-categorias/modificacion-categoria/modificacion-categoria.component'
import { BajaCategoriaComponent} from './page/abm-categorias/baja-categoria/baja-categoria.component'



const routes: Routes = [
  {path: "", canActivate: [AuthGuard],component: HomeComponent}, /* No hay que ponerle la / al principio */
  {path: "login", component: LoginComponent},
  {path: "registro", component: RegistroComponent},
  {path: "abm-productos", canActivate: [AuthGuard],component: AbmProductosComponent},
  {path: "abm-categorias", canActivate: [AuthGuard],component: AbmCategoriasComponent},
  {path: "editar-producto/:id", canActivate: [AuthGuard],component: ModificacionProductoComponent},
  {path: "eliminar-producto/:id", canActivate: [AuthGuard],component: BajaProductoComponent},
  {path: "editar-categoria/:id", canActivate: [AuthGuard],component: ModificacionCategoriaComponent},
  {path: "eliminar-categoria/:id", canActivate: [AuthGuard],component: BajaCategoriaComponent},
  {path: "ventas", canActivate: [AuthGuard],component: VentasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
