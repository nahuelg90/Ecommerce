import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/servicios/productos.service';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips'
import { environment } from 'src/environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';

import {  FileUploader } from 'ng2-file-upload'; //Incluir - npm install ng2-file-upload --save
const URL = environment.endpoint+'/productos/upload';
const TOKEN_KEY = 'token';

export interface Tag {
  tag: string;
}

export interface Imagen {
  nombreArchivo: String,
  pathArchivo: String
}


@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css']
})
export class AltaProductoComponent implements OnInit {

  public productoForm;
  public categorias;
  public loadedCategorias = false;
  public errorDeCreacion = false;
  public mensajeError ="";
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  tags_v: Tag[] = [];
  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo', authToken: localStorage.getItem(TOKEN_KEY), authTokenHeader: "x-access-token"});
  images:Array<any>=[];
  imagenes: Imagen[]= [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.tags_v.push({tag: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: Tag): void {
    const index = this.tags_v.indexOf(tag);

    if (index >= 0) {
      this.tags_v.splice(index, 1);
    }
  }

  constructor(private fBuilder: FormBuilder, private categoriasService: CategoriasService, private productosService: ProductosService,private _snackBar: MatSnackBar) {
    this.cargarForm({
      denominacion: ['',[Validators.required]],
      SKU: ['',[Validators.required]],
      precio: [0,[Validators.required]],
      precioDeOferta: 0,
      descripcion: ['',[Validators.required]],
      cantidad: [0,[Validators.required]],
      destacado: false,
      enOferta: false,
      categoria: ['',[Validators.required]]
    });

    this.categoriasService.getCategorias().subscribe(data=>{
        this.categorias = data;
        this.loadedCategorias = true;
    });



  }

  cargarForm(data){
    this.productoForm = this.fBuilder.group(data);
  }

  getTags(): String[] {
    let tags: String[] = []
    this.tags_v.forEach(element => {
      tags.push(element['tag']);
    });
    return tags;
  }



  crearProducto(): void {
    this.mensajeError = "";
    this.errorDeCreacion = true;
    if (this.uploader.queue.length > 0) {
      this.uploader.uploadAll();
    } else {
      this.crearElProducto();
    }
  }

  ngOnInit(): void {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
         let json =  JSON.parse(response);
         let nombreArchivo = json.data.originalname;
         let pathArchivo = environment.endpoint+"/images/"+json.data.filename;
         let imagenSubida = {
          nombreArchivo: nombreArchivo,
          pathArchivo:  pathArchivo
         };
         this.imagenes.push(imagenSubida);
     };

    this.uploader.onCompleteAll = () => {
      this.crearElProducto();
    };
  }

  crearElProducto(): void  {
    let producto = this.productoForm.value;
      producto.tags = this.getTags();
      producto.imagenes = this.imagenes;
      console.log(producto);
      this.productosService.postCrearProducto(producto).subscribe((data) => {

        console.log("postCrearProducto  :"+JSON.stringify(data));

          this._snackBar.open("Se creó el producto", 'Cerrar', {
            duration: 2000,
            panelClass: ['mat-primary']

          });
          this.cargarForm({
            denominacion: ['',[Validators.required]],
            SKU: ['',[Validators.required]],
            precio: [0,[Validators.required]],
            precioDeOferta: 0,
            descripcion: ['',[Validators.required]],
            cantidad: [0,[Validators.required]],
            destacado: false,
            enOferta: false,
            categoria:['',[Validators.required]]
          });
          this.tags_v.length = 0;
          this.uploader.queue.length = 0;





      },(error) => {
        console.log(error)
        this._snackBar.open("Error al crear el producto", 'Cerrar', {
          duration: 2000,
          panelClass: ['mat-primary']

        });
        this.mensajeError = error["error"]["mensaje"];
        this.errorDeCreacion = true;
      });
  }

}
