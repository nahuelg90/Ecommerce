import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosBoService } from '../servicios/usuarios-bo.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm;
  public errorEnLogin = false;

  constructor( private authService: UsuariosBoService, private router: Router,private _snackBar: MatSnackBar) {
    this.loginForm = this.crearFormulario()
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    return (new FormBuilder).group({
      email:['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginUsuario(): void{
    this.errorEnLogin = false;

    this.authService.loginUsuario(this.loginForm.value).subscribe(data=>{
      console.log("postLoginUsuario  :"+JSON.stringify(data));
        // guardar token
        localStorage.setItem("token",data['token']);
        this.authService.authenticate();
        this._snackBar.open("Bienvenido/a", 'Cerrar', {
          duration: 2000,
          panelClass: ['mat-primary']

        });
        // redirigir a home
        this.router.navigate([''])

    }, (error)=>{
      this.errorEnLogin = true;
    });


  }
}
