import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-categorias',
  templateUrl: './card-categorias.component.html',
  styleUrls: ['./card-categorias.component.css']
})
export class CardCategoriasComponent implements OnInit {

  @Input()
  categoria;

  constructor() { }

  ngOnInit(): void {
  }

}
