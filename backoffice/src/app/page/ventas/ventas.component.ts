import { Component, OnInit } from '@angular/core';
import { VentasService } from 'src/app/servicios/ventas.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})

export class VentasComponent implements OnInit {



  rows:any[]=[]
  page={
    totalElements:0,
    pageNumber:0,
    size:20
  }

  columns=[]



  constructor(private ventasService: VentasService) {
    this.page.pageNumber = 0;
    this.page.size = 10;
    this.page.totalElements = 0;
    this.columns=[{name: 'Id venta', prop:'id'},{ name: 'Fecha', prop:'fecha' }, { name: 'Total',prop:'importe' }, { name: 'Cantidad',prop:'detalle.cantidadVendida' }, {name: "Producto", prop: 'detalle.denominacion'}, {name: "Estado de pago", prop: 'estadoDePago'}]
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

    this.ventasService.getVentasListado(pageInfo).subscribe(pagedData => {

      this.rows = pagedData["docs"];
      this.page["totalElements"] = pagedData["totalDocs"]
      //Cantidad de registros por pagina
      this.page["size"] = pagedData["limit"]
      //La pagina que estoy consultando
      this.page["pageNumber"] = pageInfo["offset"]
    });
  }

  marcarPagado(id){
    let venta = this.rows.find((venta) => {
      if(venta.id === id){
        venta.estadoDePago = "Pagado";
        return venta;
    }})
    this.ventasService.putActualizarVenta(venta).subscribe(
      data => {
        console.log(data);
      }
    )
  }

  marcarImpago(id){
    let venta = this.rows.find((venta) => {
      if(venta.id === id){
        venta.estadoDePago = "Pendiente de pago";
        return venta;
    }})
    this.ventasService.putActualizarVenta(venta).subscribe(
      data => {
        console.log(data);
      }
    )
  }


}
