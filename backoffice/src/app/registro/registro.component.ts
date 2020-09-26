import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosBoService } from '../servicios/usuarios-bo.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public registroForm;
  public errorEnRegistro = false;
  public registroConExito = false;
  public passwordNoMatch = false;

  constructor( private authService: UsuariosBoService) {
    this.registroForm = this.crearFormulario()
  }

  ngOnInit(): void {
  }

  crearFormulario(){
    return (new FormBuilder).group({
      email:['', [Validators.required,Validators.email]],
      password: ['', Validators.required],
      password_repeat:['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      cuil: ['', Validators.required],
    });
  }

  crearUsuario(): void{
    this.errorEnRegistro = false;
    this.registroConExito = false;
    this.passwordNoMatch = false;
    if(this.registroForm.value.password == this.registroForm.value.password_repeat){
      this.authService.registrarUsuario(this.registroForm.value).subscribe(data=>{
        console.log("postCrearUsuario  :"+JSON.stringify(data));
        if(data.hasOwnProperty('error')){
          this.errorEnRegistro = true;
        } else {
          this.registroConExito = true;
          this.registroForm = this.crearFormulario()
        }
      })
    } else {
      this.passwordNoMatch = true;
    }

  }

}
