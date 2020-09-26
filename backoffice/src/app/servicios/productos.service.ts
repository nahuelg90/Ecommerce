import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http:HttpClient) { }

  getProductos(pageInfo=null){
    let query='';
    //PageInfo en offset recibe pagina -1, cuando consulta a express lo envia por query string
    if(pageInfo){
      query='?page='+(pageInfo["offset"]+1)
    }
    return this.http.get(environment.endpoint+"/productos/"+query).pipe(map(res => res["docs"]));
  }

  getProductosListado(pageInfo=null){
    let query='';
    //PageInfo en offset recibe pagina -1, cuando consulta a express lo envia por query string
    if(pageInfo){
      query='?page='+(pageInfo["offset"]+1)
    }
    return this.http.get(environment.endpoint+"/productos/"+query);
  }

  getProductoById(id){
    return this.http.get(environment.endpoint+"/productos/"+id)
  }

  getProductosDestacados(){
    return this.http.get(environment.endpoint+"/productos/destacados")
  }

  postCrearProducto(producto){
    return this.http.post(environment.endpoint+"/productos",producto)
  }

  putActualizarProducto(producto){
    return this.http.put(environment.endpoint+"/productos/"+producto.id,producto)
  }

  deleteEliminarProducto(producto){
    return this.http.delete(environment.endpoint+"/productos/"+producto.id,producto)
  }


}
