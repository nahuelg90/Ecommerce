import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-abm-categorias',
  templateUrl: './abm-categorias.component.html',
  styleUrls: ['./abm-categorias.component.css'],
  encapsulation: ViewEncapsulation.None // https://stackoverflow.com/questions/45940965/angular-material-customize-tab
})
export class AbmCategoriasComponent implements OnInit {

  selectedIndex = 0;

  constructor(private route:ActivatedRoute) {


  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if(params.tab){
          this.selectedIndex = params.tab
        }
        console.log(params.tab); // { order: "popular" }
      }
    );
  }


}
