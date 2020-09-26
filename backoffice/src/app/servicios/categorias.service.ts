import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; // a veces se pone import environment solo y sin las llaves. Eso es si en el otro lado hay un export default

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http:HttpClient) { }

  getCategorias(){

    return this.http.get(environment.endpoint+"/categorias")
  }

  getCategoriasTree(){

    return this.http.get(environment.endpoint+"/categorias/categorias-tree")
  }


  getCategoriasSinPadre(){
    return this.http.get(environment.endpoint+"/categorias/categorias-sin-padre")
  }

  getCategoriaSegunId(id){
      return this.http.get(environment.endpoint+"/categorias/"+id)
  }

  postCrearCategorias(categoria){
    return this.http.post(environment.endpoint+"/categorias",categoria)
  }

  putModificarCategorias(categoria){
    return this.http.put(environment.endpoint+"/categorias/"+categoria.id,categoria)
  }

  deleteEliminarCategorias(categoria){
    return this.http.delete(environment.endpoint+"/categorias/"+categoria.id,categoria)
  }
}
