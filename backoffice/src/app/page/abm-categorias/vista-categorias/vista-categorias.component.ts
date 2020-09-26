import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CategoriasService } from 'src/app/servicios/categorias.service';
import { ColumnMode} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-vista-categorias',
  templateUrl: './vista-categorias.component.html',
  styleUrls: ['./vista-categorias.component.scss']
})
export class VistaCategoriasComponent implements OnInit {

  rows:any;
  categorias;
  ColumnMode = ColumnMode;
  lastIndex = 15;

  constructor(private categoriasService: CategoriasService, private cd: ChangeDetectorRef) {

    // traigo todas las categorías por si quiero asignarle un padre
    this.categoriasService.getCategorias().subscribe(data=>{
      this.rows = data;
      console.log(this.rows)
    });

  }

  ngOnInit(): void{
  }

  onTreeAction(event: any) {
    const index = event.rowIndex;
    const row = event.row;
    if (row.treeStatus === 'collapsed') {
      row.treeStatus = 'expanded';
    } else {
      row.treeStatus = 'collapsed';
    }
    this.rows = [...this.rows];
  }
}
