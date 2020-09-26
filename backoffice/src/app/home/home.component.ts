
import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/servicios/productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  rows:any[]=[]
  page={
    totalElements:0,
    pageNumber:0,
    size:20
  }

  columns=[]



  constructor(private productosService: ProductosService) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.page.totalElements = 0;
    this.columns=[{ name: 'Nombre', prop:'denominacion' }, { name: 'Precio',prop:'precio' }, { name: 'SKU',prop:'SKU' }, {name: "Categoria", prop: 'categoria.descripcion'}, {name:"En stock", prop: 'cantidad'},{name: "¿Destacado?", prop: "destacado"}, {name: "¿En oferta?", prop: "enOferta"}]
  }

  ngOnInit(): void {
    this.setPage({ offset: 0 });
  }


  /**
   * Populate the table with new data based on the page number
   * @param page The page to select
   */
  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;

    this.productosService.getProductosListado(pageInfo).subscribe(pagedData => {


      this.rows = pagedData["docs"];
      this.page["totalElements"] = pagedData["totalDocs"]
      //Cantidad de registros por pagina
      this.page["size"] = pagedData["limit"]
      //La pagina que estoy consultando
      this.page["pageNumber"] = pageInfo["offset"]
      console.log(pagedData)
    });
  }


}
