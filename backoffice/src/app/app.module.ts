import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms'; // incluyo el forms builder para crear los formularios
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { AbmProductosComponent } from './page/abm-productos/abm-productos.component';
import { AbmCategoriasComponent } from './page/abm-categorias/abm-categorias.component';
import { VentasComponent} from './page/ventas/ventas.component'
import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';
import { AltaCategoriaComponent } from './page/abm-categorias/alta-categoria/alta-categoria.component';
import { BajaCategoriaComponent } from './page/abm-categorias/baja-categoria/baja-categoria.component';
import { ModificacionCategoriaComponent } from './page/abm-categorias/modificacion-categoria/modificacion-categoria.component';
import { DetalleCategoriaComponent } from './page/abm-categorias/detalle-categoria/detalle-categoria.component';
import { VistaCategoriasComponent } from './page/abm-categorias/vista-categorias/vista-categorias.component'; // incluyo el HttpClientModule para usar servicios HTTP
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CardCategoriasComponent } from './page/abm-categorias/card-categorias/card-categorias.component';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { InterceptorsService } from './interceptors.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
/* https://swimlane.github.io/ngx-datatable/ */
import { NgxDatatableModule} from '@swimlane/ngx-datatable';
import { AltaProductoComponent } from './page/abm-productos/alta-producto/alta-producto/alta-producto.component';
import { BajaProductoComponent } from './page/abm-productos/baja-producto/baja-producto/baja-producto.component';
import { CardProductoComponent } from './page/abm-productos/card-producto/card-producto/card-producto.component';
import { DetalleProductoComponent } from './page/abm-productos/detalle-producto/detalle-producto/detalle-producto.component';
import { ModificacionProductoComponent } from './page/abm-productos/modificacion-producto/modificacion-producto/modificacion-producto.component';
import {FileUploadModule} from 'ng2-file-upload'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistroComponent,
    LoginComponent,
    AbmProductosComponent,
    AbmCategoriasComponent,
    VentasComponent,
    MenuSuperiorComponent,
    AltaCategoriaComponent,
    BajaCategoriaComponent,
    ModificacionCategoriaComponent,
    DetalleCategoriaComponent,
    VistaCategoriasComponent,
    CardCategoriasComponent,
    AltaProductoComponent,
    BajaProductoComponent,
    CardProductoComponent,
    DetalleProductoComponent,
    ModificacionProductoComponent,
    AbmProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // agrego los imports de @angular/forms
    ReactiveFormsModule,  // agrego los imports de @angular/forms
    HttpClientModule, // agrego los imports de @angular/common/http
    BrowserAnimationsModule ,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxDatatableModule,
    MatSnackBarModule,
    MatChipsModule,
    MatIconModule,
    MatCheckboxModule,
    FileUploadModule,
    MatDividerModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorsService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
