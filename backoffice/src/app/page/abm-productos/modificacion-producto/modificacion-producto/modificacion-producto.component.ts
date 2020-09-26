import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProductosService } from 'src/app/servicios/productos.service';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips'
import { environment } from 'src/environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import {  FileUploader } from 'ng2-file-upload'; //Incluir - npm install ng2-file-upload --save

export interface Tag {
  tag: String;
}

export interface Imagen {
  nombreArchivo: String,
  pathArchivo: String,
  _id ?: String
}

const URL = environment.endpoint+'/productos/upload';
const TOKEN_KEY = 'token';


@Component({
  selector: 'app-modificacion-producto',
  templateUrl: './modificacion-producto.component.html',
  styleUrls: ['./modificacion-producto.component.css']
})
export class ModificacionProductoComponent implements OnInit {

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
  public productoNoEncontrado = false;
  private id;
  public botonDeshabilitado = true;
  public loadedProduct = false;

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

  removeImage(image: Imagen): void {
    const index = this.imagenes.indexOf(image);

    if (index >= 0) {
      this.imagenes.splice(index, 1);
    }
  }

  handleOnKey(event){
    if(!this.loadedProduct){
      if (event.key === "Enter" || event.keyCode === 13) {
        this.cargarProductoSegunId();
      }
    }

  }

  handleOnFocusOut(event){
    if(!this.loadedProduct){
      this.cargarProductoSegunId();
    }

  }

  constructor(private fBuilder: FormBuilder, private categoriasService: CategoriasService, private productosService: ProductosService,private _snackBar: MatSnackBar, private route:ActivatedRoute,) {
    this.id = this.route.snapshot.paramMap.get("id")
    this.cargarForm({
      id: [{value:this.id, disabled: false},[Validators.required]],
      denominacion: [{value:'', disabled: true},[Validators.required]],
      SKU: [{value:'', disabled: true},[Validators.required]],
      precio: [{value:'', disabled: true},[Validators.required]],
      precioDeOferta: {value:'', disabled: true},
      descripcion: [{value:'', disabled: true},[Validators.required]],
      cantidad: [{value:'', disabled: true},[Validators.required]],
      destacado: {value:false, disabled: false}, // la idea era que queden deshabilitados y habilitarlos cuando cargue (como los demás), pero no lo pude hacer. Quedaban siempre deshabilitados
      enOferta: {value:false, disabled: false}, // la idea era que queden deshabilitados y habilitarlos cuando cargue (como los demás), pero no lo pude hacer. Quedaban siempre deshabilitados
      categoria: [{value:[], disabled: false},[Validators.required]] // la idea era que queden deshabilitados y habilitarlos cuando cargue (como los demás), pero no lo pude hacer. Quedaban siempre deshabilitados
    });

    this.categoriasService.getCategorias().subscribe(data=>{
        this.categorias = data;
        this.loadedCategorias = true;
    });

    if(this.id){
      this.cargarProductoSegunId()
    }

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

  toTags(tags: String[]) {
    tags.forEach((element: String) =>{
      this.tags_v.push({
        tag: element
      }

      )
    })

  }

  cargarImagenes(imagenes){
    imagenes.forEach(element => {
      this.imagenes.push(element)
    });
  }

  modificarProducto(): void {
    this.mensajeError = "";
    this.errorDeCreacion = true;
    if (this.uploader.queue.length > 0) {
      this.uploader.uploadAll();
    } else {
      this.modificarElProducto();
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
      this.modificarElProducto();
    };

    /*this.route.queryParams
      .subscribe(params => {
        if(params.id){
          this.id = params.id
          this.cargarProductoSegunId()
        }
      }
    );*/
  }

  modificarElProducto(): void  {
    let producto = this.productoForm.value;
      producto.tags = this.getTags();
      producto.imagenes = this.imagenes;
      this.productosService.putActualizarProducto(producto).subscribe((data) => {

          this._snackBar.open("Se modificó el producto", 'Cerrar', {
            duration: 2000,
            panelClass: ['mat-primary']

          });
          this.cargarForm({
            id: [{value:'', disabled: false},[Validators.required]],
            denominacion: [{value:'', disabled: true},[Validators.required]],
            SKU: [{value:'', disabled: true},[Validators.required]],
            precio: [{value:'', disabled: true},[Validators.required]],
            precioDeOferta: {value:'', disabled: true},
            descripcion: [{value:'', disabled: true},[Validators.required]],
            cantidad: [{value:'', disabled: true},[Validators.required]],
            destacado: {value:false, disabled: false},
            enOferta: {value:false, disabled: false},
            categoria: [{value:[], disabled: false},[Validators.required]]
          });
          this.tags_v.length = 0;
          this.uploader.queue.length = 0;
          this.imagenes.length = 0;
          this.images.length = 0;
          this.loadedProduct = true;




      },(error) => {
        this._snackBar.open("Error al crear el producto", 'Cerrar', {
          duration: 2000,
          panelClass: ['mat-primary']

        });
        this.mensajeError = error["error"]["mensaje"];
        this.errorDeCreacion = true;
      });
  }

  cargarProductoSegunId(){
    if(this.productoForm.value.id){
      this.id = this.productoForm.value.id
      this.productosService.getProductoById(this.productoForm.value.id).subscribe((data: any)=>{
        if(data){
          this.productoNoEncontrado = false;

          this.cargarForm({
            id: this.id,
            denominacion: [{value:data["denominacion"], disabled: false},[Validators.required]],
            SKU: [{value:data["SKU"], disabled: false},[Validators.required]],
            precio: [{value:data["precio"], disabled: false},[Validators.required]],
            precioDeOferta: {value:data["precioDeOferta"], disabled: false},
            descripcion: [{value:data["descripcion"], disabled: false},[Validators.required]],
            cantidad: [{value:data["cantidad"], disabled: false},[Validators.required]],
            destacado: new FormControl({value:data["destacado"], disabled: false}, Validators.required),
            enOferta: new FormControl({value:data["enOferta"], disabled: false}, Validators.required),
            categoria: new FormControl({value:data["categoria"]["_id"], disabled: false}, Validators.required)
          });
          if(data.hasOwnProperty("tags")){
            this.toTags(data["tags"])
          }
          console.log(data)
          if(data.hasOwnProperty("tags")){
            this.cargarImagenes(data["imagenes"])
          }


          this.botonDeshabilitado = false;
          this.loadedProduct = true;
        } else {
          this.productoNoEncontrado = true;
          this.botonDeshabilitado = true;
        }


      }, (error)=>{

        this.productoNoEncontrado = true;
        this.botonDeshabilitado = true;
      })
    }

  }

}
