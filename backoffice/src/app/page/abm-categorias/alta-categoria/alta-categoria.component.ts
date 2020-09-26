import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriasService } from 'src/app/servicios/categorias.service';

@Component({
  selector: 'app-alta-categoria',
  templateUrl: './alta-categoria.component.html',
  styleUrls: ['./alta-categoria.component.css']
})
export class AltaCategoriaComponent implements OnInit {

  public categoriaForm;
  public categorias;
  public categoriasSinPadre;
  public loadedCategorias = false;
  public loadedCategoriasHijas = false;

  constructor(private fBuilder: FormBuilder, private categoriasService: CategoriasService) {
    this.categoriaForm = this.fBuilder.group({
      idCategoria: [''],
      descripcion: ['', Validators.required],
      categoriaPadre: [],
      categoriasHijas: [[]] //tuve que poner que es un array vacío porque sino fallaba el $push del lado de node (¿cómo podría validarlo con node?)
    });

    // traigo todas las categorías por si quiero asignarle un padre
    this.categoriasService.getCategorias().subscribe(data=>{
        this.categorias = data;
        this.loadedCategorias = true;
    });

    // traigo todas las categorías que no tienen padre por si quiero asignarle una hija
    this.categoriasService.getCategoriasSinPadre().subscribe(data=>{
      this.categoriasSinPadre = data;
      this.loadedCategoriasHijas = true;
    });

  }

  ngOnInit(): void {
  }

  crearCategoria(): void{
    console.log(this.categoriaForm.value)
    this.categoriasService.postCrearCategorias(this.categoriaForm.value).subscribe(data=>{
      console.log("postCrearCategorias  :"+JSON.stringify(data));
    })
    location.reload();
  }


}
