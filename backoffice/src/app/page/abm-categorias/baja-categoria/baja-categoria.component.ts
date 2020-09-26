import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-baja-categoria',
  templateUrl: './baja-categoria.component.html',
  styleUrls: ['./baja-categoria.component.css']
})
export class BajaCategoriaComponent implements OnInit {

  public categoriaForm;
  public categorias;
  public categoriasSinPadre;
  public loadedCategorias = false;
  public loadedCategoriasHijas = false;
  public categoriaNoEncontrada = false;
  public categoriaNoCargada = true;
  private id;
  private nombreCategoria;
  public errorDeEliminacion = false;
  public mensajeError ="";

  constructor(private fBuilder: FormBuilder, private categoriasService: CategoriasService,private route:ActivatedRoute,private _snackBar: MatSnackBar) {
    this.id = this.route.snapshot.paramMap.get("id")
    this.cargarForm({
      id: [this.id, Validators.required],
      descripcion: new FormControl({value: '', disabled: true}, Validators.required),
      categoriaPadre: [{value: [],disabled: true}],
      categoriasHijas: [{value: [[]] , disabled: true}]

    });

    // traigo todas las categorías por si quiero asignarle un padre
    this.categoriasService.getCategorias().subscribe(data=>{
        this.categorias = data;
        this.loadedCategorias = true;
    });

    // traigo todas las categorías que no tienen padre por si quiero asignarle una hija
    this.categoriasService.getCategorias().subscribe(data=>{
      this.categoriasSinPadre = data;
      this.loadedCategoriasHijas = true;
    });

    if(this.id){

      this.cargarCategoriaSegunId();
    }

  }

  cargarForm(data){
    this.categoriaForm = this.fBuilder.group(data);
  }

  handleOnKey(event){
    if (event.key === "Enter" || event.keyCode === 13) {
      this.cargarCategoriaSegunId();
    }
  }

  handleOnFocusOut(event){
    this.cargarCategoriaSegunId();
  }


  cargarCategoriaSegunId(){
    if(this.categoriaForm.value.id){
      this.id = this.categoriaForm.value.id
      this.categoriaNoCargada = true;
      this.categoriasService.getCategoriaSegunId(this.categoriaForm.value.id).subscribe((data: any)=>{
        if(data){
          this.categoriaNoCargada = false;
          this.categoriaNoEncontrada = false;
          let categoriasHijas = [];
          data["categoriasHijas"].forEach(element => {
            categoriasHijas.push(element['_id']);
          });
          this.cargarForm({
            id: this.id,
            descripcion: [{value:data["descripcion"],disabled: false}, Validators.required],
            categoriaPadre: [{value: data["categoriaPadre"],disabled: false}],
            categoriasHijas: [{value: categoriasHijas , disabled: false}]//tuve que poner que es un array vacío porque sino fallaba el $push del lado de node (¿cómo podría validarlo con node?)
          });
          console.log(this.categoriaForm)
        } else {
          this.categoriaNoEncontrada = true;
        }


      }, (error)=>{
        this.categoriaNoEncontrada = true;
      })
    }

  }

  ngOnInit(): void {

  }

  eliminarCategoria(): void{

    this.nombreCategoria = this.categoriaForm.value.descripcion;
    this.errorDeEliminacion = false;
    this.mensajeError ="";
    this.categoriasService.deleteEliminarCategorias(this.categoriaForm.value).subscribe(data=>{
      this._snackBar.open("Se eliminó la categoría "+data["descripcion"], 'Cerrar', {
        duration: 2000,
        panelClass: ['mat-primary']

      });
      this.cargarForm({
        id: ['', Validators.required],
        descripcion: new FormControl({value: '', disabled: true}, Validators.required),
        categoriaPadre: [{value: [],disabled: true}],
        categoriasHijas: [{value: [[]] , disabled: true}]

      });

    },(error) => {
      this._snackBar.open("Error al eliminar la categoría", 'Cerrar', {
        duration: 2000,
        panelClass: ['mat-primary']

      });
      this.mensajeError = error["error"]["mensaje"];
      this.errorDeEliminacion = true;
    });
  }

}
