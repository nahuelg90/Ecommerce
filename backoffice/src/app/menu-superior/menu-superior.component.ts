import { Component, OnInit } from '@angular/core';
import { UsuariosBoService } from '../servicios/usuarios-bo.service';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent implements OnInit {

  opciones=[]

  isLogin;

  constructor(private auth:UsuariosBoService) {
    this.auth.isAuthenticated().subscribe((state)=>{
      this.isLogin=state
      if(this.isLogin){
        this.opciones=[
          {path:"/",name:"Home"},
          {path:"/abm-productos",name:"ABM de productos"},
          {path:"/abm-categorias",name:"ABM de categorías"},
          {path:"/ventas",name:"Ventas"},
        ]
      }else{
        this.opciones=[
          {path:"/registro",name:"Registro"},
          {path:"/login",name:"Login"}
        ]

      }
    })
  }

  logout(){
    this.auth.logout()
  }
  ngOnInit(): void {
  }

}
