import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductosService } from 'src/app/servicios/productos.service';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-baja-producto',
  templateUrl: './baja-producto.component.html',
  styleUrls: ['./baja-producto.component.css']
})
export class BajaProductoComponent implements OnInit {

  public productoForm;
  public categorias;
  public loadedCategorias = false;
  public errorDeEliminacion = false;
  public mensajeError ="";
  public productoNoEncontrado = false;
  private id;
  public botonDeshabilitado = true;
  public loadedProduct = false;



  constructor(private fBuilder: FormBuilder, private categoriasService: CategoriasService, private route:ActivatedRoute,private productosService: ProductosService,private _snackBar: MatSnackBar) {
    this.id = this.route.snapshot.paramMap.get("id")
    console.log(this.id)
    this.cargarForm({
      id: [{value:this.id, disabled: false},[Validators.required]],
      denominacion: [{value:'', disabled: true},[Validators.required]],
      SKU: [{value:'', disabled: true},[Validators.required]],
      precio: [{value:'', disabled: true},[Validators.required]],
      precioDeOferta: {value:'', disabled: true},
      descripcion: [{value:'', disabled: true},[Validators.required]],
      cantidad: [{value:'', disabled: true},[Validators.required]],
      destacado: {value:false, disabled: true},
      enOferta: {value:false, disabled: true},
      categoria: [{value:[], disabled: true},[Validators.required]]
    });
    // traigo todas las categorías por si quiero asignarle un padre
    this.categoriasService.getCategorias().subscribe(data=>{
        this.categorias = data;
        this.loadedCategorias = true;
    });

    if(this.id){
      this.cargarProductoSegunId()
    }

  }

  ngOnInit(): void {

  }

  cargarForm(data){
    this.productoForm = this.fBuilder.group(data);
  }

  eliminarProducto(){
    if(this.id!=""){
      this.errorDeEliminacion = false;
      this.mensajeError ="";
      this.productosService.deleteEliminarProducto(this.productoForm.value).subscribe((data)=>{

        this._snackBar.open("Se eliminó el producto "+data["denominacion"], 'Cerrar', {
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
          destacado: {value:false, disabled: true},
          enOferta: {value:false, disabled: true},
          categoria: [{value:[], disabled: true},[Validators.required]]
        });
        this.botonDeshabilitado = true;
        this.loadedProduct = false;
      }, (error)=>{
        this._snackBar.open("Error al eliminar el producto", 'Cerrar', {
          duration: 2000,
          panelClass: ['mat-primary']

        });
        this.mensajeError = error["error"]["mensaje"];
        this.errorDeEliminacion = true;
      })
    }
  }

  handleOnKey(event){
    if (!this.loadedProduct){
      if (event.key === "Enter" || event.keyCode === 13) {
        this.cargarProductoSegunId();
      }
    }

  }

  handleOnFocusOut(event){
    if (!this.loadedProduct){
      this.cargarProductoSegunId();
    }
  }

  cargarProductoSegunId(){
    if(this.productoForm.value.id){
      this.id = this.productoForm.value.id
      this.productosService.getProductoById(this.productoForm.value.id).subscribe((data: any)=>{
        if(data){
          this.productoNoEncontrado = false;

          this.cargarForm({
            id: this.id,
            denominacion: [{value:data["denominacion"], disabled: true},[Validators.required]],
            SKU: [{value:data["SKU"], disabled: true},[Validators.required]],
            precio: [{value:data["precio"], disabled: true},[Validators.required]],
            precioDeOferta: {value:data["precioDeOferta"], disabled: true},
            descripcion: [{value:data["descripcion"], disabled: true},[Validators.required]],
            cantidad: [{value:data["cantidad"], disabled: true},[Validators.required]],
            destacado: {value:data["destacado"], disabled: true},
            enOferta: {value:data["enOferta"], disabled: true},
            categoria: [{value:data["categoria"]["_id"], disabled: true},[Validators.required]]
          });
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
