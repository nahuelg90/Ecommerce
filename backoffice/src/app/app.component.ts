import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'
  ]
})
export class AppComponent {
  title = 'backoffice';
  token = '';
  constructor(public router: Router){}

  ngOnInit(): void{
    this.token = localStorage.getItem('token');
    if (this.token == null){
      this.router.navigate(["/login"])
    }

  }
}
